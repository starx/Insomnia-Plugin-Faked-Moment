# Insomnia plugin: Faked moment

This builds on top of [faker](https://insomnia.rest/plugins/insomnia-plugin-faker) plugin. Whenever a date value is generated using faker, it passes the result to moment.js exposing its API which can be invoked via JSON format. 

## Supported features (so far)

* Format

      {"format":"YYYY-MM-DD"}
