'use strict';

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

function createTemplateArgs(postInfo) {
    var templateArgs = {};

    Object.keys(configKeys).forEach((key) => { templateArgs[key] = configKeys[key](hexo.config); });
    Object.keys(postKeys).forEach((key) => { templateArgs[key] = postKeys[key](postInfo); });

    return templateArgs;
}

hexo.extend.tag.register('post_link', function (args, content) {
    var templateName = args[0];

    var postLinkTemplates = hexo.locals.get('data').post_link;
    if (!postLinkTemplates || !postLinkTemplates[templateName]) {
        return '';
    }

    var template = postLinkTemplates[templateName];
    var templateArgs = createTemplateArgs(this);
    return underscore.template(template)(templateArgs);
})
