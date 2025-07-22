# Solution Notes

I tried to solve this in a pragmatic way. I tried improving on some things:

- Visualize the flow of data in the workflow with an animated line
- Make the nodes draggable for organization
- Make the canvas pannable with click and drag for the overview
- Highlight only relevant nodes and connectors when hovering on a node

Lots of things I would have liked to work on, like fleshing out the canvas (2 finger pan, wheel zooming) and nail the data structure (though that would be more of a backend dev task). The data structure is just for rendering this, I didn't think through a full proper scenario.

I particularly like the type safe event emitter. You might notice that I use refs a lot to add dynamic styling, instead of putting it on the nodes in the context. This is to avoid rerenders on every single mousemovement. However, in a real world scenario, if we were to save the positions, it could have made sense to save it somewhere so all the data flows 1 way.

No libraries were installed, and no generative AI was used for this.

## Workflow challenge

At Light, we want to implement the best in class approval workflow. One example of that is when our customers onboard a new vendor. Before the vendor can be used, it needs to go through a series of checks and approvals by different people in the organization.

To support that we want to build a UI that can help them create and visualize those workflows.

For this challenge we are providing a design of what this workflow should look like and we want you to implement the code to display it.

![challenge design](/design.png)

_design.png_

## Challenge requirements

This is the list of things you should provide:

1. An HTTP API that returns the data necessary to render the provided design.

   - Don't worry about storing this data, just hardcoding the data and returning it via an API is fine.

2. The logic to fetch the data and render the workflow.
   - Please don't use any external libraries to render the workflow, we want to see how you would implement this part.
   - The three dots menu in the design (`...`) doesn't do anything, just rendering it there is fine.

Don't worry about making it pixel perfect or matching the icons and colours exacly. We know working against a png file is not ideal.

The icons you see in the image come from the lucide library. The `lucide-react` package is already installed in the project.

For any other consideration or thing you would do better/differently in a real world scenario, feel free to put it in the README, no need to implement it.

## Provided code

We provide a basic setup with NextJS, Typescript and tailwind. This is just a suggestion, feel free to use any framework and tools you like.

### How to build & run

```sh
npm install
npm run dev
```

### Submitting your implementation

1. Run `git bundle create challenge-<your-name>.bundle --all`
2. Send us the generated bundle file
