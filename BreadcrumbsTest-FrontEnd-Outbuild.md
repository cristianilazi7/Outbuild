# Outbuild Frontend Assesment

### Part 1: Collaborative Task Board Application

Create a real-time task board (Kanban) application, similar to tools like Trello or Jira, where multiple users can manage tasks collaboratively. The application should allow:

1. Creating, editing, deleting, and moving tasks between columns: “To Do”, “In Progress”, “Done”.
2. Viewing changes in real-time when multiple users interact with the board.
3. Displaying the presence of other connected users and highlighting which task they are editing or moving at the moment.


#### Technical Requirements:

1. The application should be built in **React** (you may use **Next**).
2. Implement real-time functionality using a technology of your choice (**WebSockets**, **Firebase Realtime Database**, etc.).
3. It is not necessary to persist the data, meaning that all actions performed can be lost when the page is refreshed.

#### Evaluation:

1. Correct functionality of the board and real-time synchronization.
2. Organization and structuring of the code.
3. Handling of concurrency (how the system manages multiple users moving tasks simultaneously).


### Part 2: UX/UI and Real-Time Collaboration

The focus here is on optimizing the user experience when working in real-time with other collaborators:

###### UI:

1. Implement an interface that is visually attractive and clear. The interface should be easy to use, with a clear visual separation between tasks, columns, and the list of connected users.

###### Visual Collaboration:

1. Add visual feedback for user interactions. For example, if another user is moving a task, make it visually highlighted so everyone can see.
2. Implement a real-time indicator showing connected users and which task they are working on (e.g., an icon next to the task they are editing).

#### Evaluation:

1. Quality of the collaborative and visual experience.
2. Creativity in implementing visual feedback and real-time notifications.

### Part 3: Other Considerations

1. **Documentation**: Provide clear documentation about the code structure and decisions made.
2. **Testing**: Implement unit tests and/or integration tests for the main functions of the application (task creation and movement, real-time presence).

### Final Evaluation:

1. **Real time collaboration**: Ability to synchronize and manage multiple users connected in real-time.
2. **Frontend skills**: Competence with modern Front End technologies, state management, and performance optimization.
3. **UX/UI**: Good eye for design and a smooth user experience.
4. **Testing**: Validate the robustness of the application with unit or integration tests.

### Delivery Times

From the moment you received this test, you have 5 days to complete it. Good luck!

If you have any doubts please contact jorge@outbuild.com

### Important:

1. The code must be available in a public repository (GitHub, GitLab, etc.), and if additional installation or configuration is required, it should be detailed in the Readme.
2. If, when pulling the code from the repository, it doesn’t compile, it will automatically be considered as not submitted.
