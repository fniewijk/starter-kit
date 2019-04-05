# Departure Information Demo app.

This is a quick app I (Folkert Niewijk), whipped up based on the starter kit using [ngX-Rocket](https://github.com/ngx-rocket/generator-ngx-rocket).

It's a simple fork of the starter app with an extra component called travel-information, in the src/app/travel-information/ directory. Most of the work went on in that directory.

I created this in a few hours last night, to hopefully show that I will be able to switch to Angular 7 pretty quickly.

I wanted to make a Travel Information app, but I was having trouble with the API's so I settled on a departures app.

Good things:

- You can request departures from stations with the NS abbreviation system, for example UT, and add a date with an HTML 5 date picker.
- I wrote some tests and they all pass. Mocked an observer.
- I obfusciated the NS_TOKEN for the frontend by using a proxy.
- I followed the Angular design patterns.
- I used the BEM pattern for class naming.

Bad things:

- There are some tests I didn't get to.
- Types need some work.
- The SCSS isn't amazing.

# Getting started

1. Go to project folder and install dependencies:

```bash
npm install
```

2. Launch development server, and open `localhost:4200` in your browser:

```bash
NS_TOKEN=your_ns_api_token_here npm start
```

3. Log in with any credentials, click on the Departure Information Link in the header.
