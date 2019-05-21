![iart logo](https://raw.githubusercontent.com/iartag/hek-ml-workshop/master/docs/assets/images/iart-logo.png "iart logo")


# iart AI session and H3K ML workshop 

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/iartag)

Main repository for the internal AI session @iart and the public H3K ML workshop.

All the info regarding the workshop as well as direct links to learning materials (slides, notebooks, examples, etc... ) are accessible via the github pages for this repository:

https://iartag.github.io/hek-ml-workshop/


## Content

1. [Slides for the internal presentation at iart](./slides/presentation01.html)
2. [Slides for the ML workshop](./slides/presentation02.html)


## Schedule

* 11am - Start :smiley_cat:
* 11am - Introduction 
* 12pm - Lunch
* 12.45pm - Software setup
* 1.15pm - Experiments
* 3.15 - Presentation
* 4pm - End :crying_cat_face:


## Tools

### System requirement
Modern machine with decent hardware and sufficient space on the hard drive (20+ Gb)

### Runway
We are using [__Runway__](https://runwayapp.ai), a tool which makes deploying ML models easy, as middleware to build the interactive experiments. All participants to the workshop should have received an invitations with some GPU credits :tada:. For those who have not installed it prior to the workshop, we will go through the [installation process](https://docs.runwayml.com/#/getting-started/installation) together.


### Docker
[__Docker__](https://www.docker.com/) is needed in order to deploy some of the models locally. This will give us some flexibility when running experiments locally. It will also allow us to _chain_ models (at the moment a user can only run one model instance using the provided cloud GPU in Runway). A guide to getting started is [available](https://docs.runwayml.com/#/getting-started/installation?id=download-docker) for linux user those [post install steps](https://docs.docker.com/install/linux/linux-postinstall/) could be useful as well

> Docker for Windows requires Microsoft Hyper-V, which is supported only in the Pro, Enterprise or Education editions of Windows. If you don't have a Pro, Enterprise or Education Windows edition you will not be able to install Docker and you will be able to only run some models using cloud GPU.


### P5.js
We will use [__p5.js__ ](https://p5js.org/) for the front end. It’s a high level creative programming framework with an [intuitive API](https://p5js.org/reference/). If some of you have used Processing before you should be confortable using p5.js. To get familiar with p5 you can go through this list of tutorials / guides:

- [P5 Learn](https://p5js.org/learn/)
- [P5 Wiki](https://github.com/processing/p5.js/wiki/)
- [Creative Coding](https://creative-coding.decontextualize.com/)
- [Shiffman's Foundation of programming in js](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA)
- [P5js reference](https://p5js.org/reference/)


### Code editor
If you don’t have a code editor installed please install one. Some suggestions (in no particular order)
- [Sublime Text](https://www.sublimetext.com)
- [Visual Studio](https://code.visualstudio.com)
- [Atom](https://atom.io) 


### Web server
We need a simple web server to run the experiments locally. Some suggestions 
- If you have node.js/npm installed you can use _live-server_: `npm install -g live-server`, 
- [Other recommended options](https://github.com/processing/p5.js/wiki/Local-server)


## Repository structure

```
├── docs
│   ├── _layouts
│   ├── assets            (img, etc.. for content)
│   │   ├── css
│   │   └── images
│   └── slides            (slides of the presentations)
│       ├── demos
│       └── static        (img, etc.. for slides)
├── samples               (code sample) 
└── utilities             (scripts and notes)

```