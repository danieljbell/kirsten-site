---
layout: layouts/post.njk
title: Resume
templateClass: tmpl-post
eleventyNavigation:
  key: Resume
  order: 4
---

<section class="resume--experience">
  <header>
    <h2>What I've Been Up To</h2>
  </header>
  <ul class="resume--jobs">
    {%- for job in jobs -%}
    <li class="job">
      <h3 class="job--title">{{ job.title }}</h3>
      <p class="job--company">
        {% if job.url %}<a href="{{ job.url }}">{{ job.company }}</a>
        {% else %}{{ job.company }}
        {% endif %}, {{ job.location }}
        </p>
      <p class="job--dates">{{ job.dates }}</p>
      <div class="job--description">{{ job.description }}</p>
    </li>
    {%- endfor -%}
  </ul>
</section>