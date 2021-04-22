Good job, Ellie! All of the functionality works really nicely.

In terms of feedback, I suggest reviewing react state patterns. You add variables directly in a component's `constructor`, when they should be in the state. You also should not directly modify a state's component and should use `this.setState()` instead. The pattern you follow for forms, should be the same pattern throughout the application anytime something is in state.

Let me know if any of this would be helpful to review together during office hours.

Your use of redux isn't consistent. All of the updates to your data should flow through the state. Which means that in addition to having actions and action creators for creating and deleting a student or campus, you should also have actions and action creators for updating a student or campus.

in your mapStateToProps functions, you're returning the entire state, when you should just return the specific parts of the state that you are using in that particular component. Think of the state as the tools you need to build furniture. Instead of giving the components every single tool in the toolbox, you only want to give them the tools they need for the particular piece of furniture they are building.

I have some more comments in the various files throughout your repo.
