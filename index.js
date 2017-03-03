'use strict';

var log = hexo.log || log.log;

var underscore = require('underscore');

var configKeys = {
    'site_title' : (config) => config.title,
    'site_subtitle' : (config) => config.subtitle,
    'site_description' : (config) => config.description,
    'site_author' : (config) => config.author,
    'site_url' : (config) => config.url
};

var postKeys = {
    'post_title' : (config) => config.title,
    'post_slug' : (config) => config.slug,
    'post_created' : (config) => config.date,
    'post_created_date' : (config) => config.date.format(hexo.config.date_format),
    'post_created_time' : (config) => config.date.format(hexo.config.time_format),
    'post_updated' : (config) => config.updated,
    'post_updated_date' : (config) => config.updated.format(hexo.config.date_format),
    'post_updated_time' : (config) => config.updated.format(hexo.config.time_format),
    'post_relative_url' : (config) => config.path,
    'post_permalink' : (config) => config.permalink
};

hexo.extend.filter.register('before_post_render', function(postInfo) {
    var config = hexo.config.post_link;
    if (!config) {
        return;
    }

    // Currently, we only enable the global post link for posts.
    // If global post link on other layout is need, we need to add per layout global post link configuations.
    if (postInfo.layout !== 'post') {
        return;
    }

    if (postInfo.disable_global_post_link) {
        return;
    }

    var globalPostLinkConfig = {};

    // Check post link configuration for all posts
    if (config.insert_before_post) {
        globalPostLinkConfig.insertBeforePost = config.insert_before_post;
    }

    if (config.insert_after_post) {
        globalPostLinkConfig.insertAfterPost = config.insert_after_post;
    }

    // Check post link configuration for each type
    var perTypeConfigs = config.per_type_configs;

    if (perTypeConfigs) {
        globalPostLinkConfig = perTypeConfigs.reduce(function(result, perTypeConfig) {
            switch (perTypeConfig.type) {
                case "category":
                    updateGlobalPostLinkSettingsIfNameExists(perTypeConfig, postInfo.categories, result);
                    break;
                case "tag":
                    updateGlobalPostLinkSettingsIfNameExists(perTypeConfig, postInfo.tags, result);
                    break;
            }
            return result;
        }, globalPostLinkConfig);
    }

    // Generate the post link tags
    var globalPostLinks = {};
    if (globalPostLinkConfig.insertBeforePost) {
        globalPostLinks.insertBeforePost = '{% post_link ' + globalPostLinkConfig.insertBeforePost + ' %}\n\n';
    }

    if (globalPostLinkConfig.insertAfterPost) {
        globalPostLinks.insertAfterPost = '\n\n{% post_link ' + globalPostLinkConfig.insertAfterPost + ' %}';
    }

    var content = [ globalPostLinks.insertBeforePost, postInfo.content, globalPostLinks.insertAfterPost ].join('');
    postInfo.content = content;
});

function updateGlobalPostLinkSettingsIfNameExists(perTypeConfig, query, result) {
    var nameInQuery = query.findOne({ name: perTypeConfig.name });
    if (!nameInQuery) {
        return;
    }

    log.d("Per type config hit: type = " + perTypeConfig.type + ", name = " + perTypeConfig.name);

    if (perTypeConfig.insert_before_post) {
        result.insertBeforePost = perTypeConfig.insert_before_post;
    }

    if (perTypeConfig.insert_after_post) {
        result.insertAfterPost = perTypeConfig.insert_after_post;
    }
}

hexo.extend.tag.register('post_link', function (args, content) {
    var templateName = args[0];
    return generatePostLink(templateName, this);
});

function generatePostLink(templateName, postInfo) {
    if (!templateName) {
        return '';
    }

    var postLinkTemplates = hexo.locals.get('data').post_link;
    if (!postLinkTemplates || !postLinkTemplates[templateName]) {
        return '';
    }

    var template = postLinkTemplates[templateName];
    var templateArgs = createTemplateArgs(postInfo);
    return underscore.template(template)(templateArgs);
}

function createTemplateArgs(postInfo) {
    var templateArgs = {};

    Object.keys(configKeys).forEach((key) => { templateArgs[key] = configKeys[key](hexo.config); });
    Object.keys(postKeys).forEach((key) => { templateArgs[key] = postKeys[key](postInfo); });

    return templateArgs;
}

