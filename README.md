# hexo-tag-post-link

[![npm version](https://badge.fury.io/js/hexo-tag-post-link.svg)](http://badge.fury.io/js/hexo-tag-post-link)

A hexo tag plugin for inserting post link in your posts with your own format.

## Installation

``` bash
$ npm install hexo-tag-post-link --save
```

## Usage

1. Create "_data" folder under "source" folder, if you don't have it.
2. Create "post_link.yml" in your "source/_data" folder
3. Add your own post link format in ymal
   ```
   name: format
   ```

   Example
   ```
   header: <b>The link to this post: </b><a href="<%= post_permalink %>" target="_blank"><%= post_title %></a>
   ```

4. Add post link tag to wherever you like in your post
   ```
   {% post_link <name> %}
   ```
   Example:
   ```
   {% post_link header %}
   ```

### Adding post link to all posts
hexo-tag-post-link supports adding post link to all posts by setting the ```_config.yml``` file:
```
post_link:
  insert_before_post: <template_name>
  insert_after_post: <template_name>
```

Let's say we have template ```header``` and ```footer``` defined in our postlink.yml data file. Then we could use the following configuration to add them to all posts.
```
post_link:
  insert_before_post: header
  insert_after_post: footer
```

## Supported Variables:

* site_title
* site_subtitle
* site_description
* site_author
* site_url
* post_title
* post_slug
* post_created
* post_created_date
* post_created_time
* post_updated
* post_updated_date
* post_updated_time
* post_relative_url
* post_permalink

## License

BSD v3
