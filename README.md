# hexo-tag-post-link

[![npm version](https://badge.fury.io/js/hexo-tag-post-link.svg)](http://badge.fury.io/js/hexo-tag-post-link)

A hexo tag plugin for inserting post link in your posts with your own format.

## Installation

``` bash
$ npm install hexo-tag-post-link --save
```

## Usage

1. Create "post_link.ymal" in your "_source/_data" folder
2. Add your own post link format in ymal
   ```
   name: format
   ```

   Example
   ```
   header: <b>The link to this post: </b><a href="<%= post_permalink %>" target="_blank"><%= post_title %></a>
   ```

3. Add post link tag to wherever you like in your post
   ```
   {% post_link <name> %}
   ```
   Example:
   ```
   {% post_link header %}
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
