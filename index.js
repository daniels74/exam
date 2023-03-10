// To start server -> npm run json:server

import { Api } from "./api.js";

// ----View----: A slave function for the use of changing the lists on screen
const View = (() => {
  const domstr1 = {
    pendingContainer: ".pendinglist__items",
    completedContainer: ".completedlist__items",
    inputboxbutton: ".btn",
    bothListContainer: ".lists__container",
  };

  // replaces (ele) html code with new (tmp) ele hmtl code
  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  };

  // html for pending lists container
  const createTmp = (arr) => {
    let tmp = "";
    arr.forEach((ele) => {
      tmp += `
        <li id="${ele.id}" class="list__item">
              <text class="description">${ele.title}</text>
              <div class="option__buttons">
                          
             <button class="edit-btn" id="${ele.id}">
                <svg
                  class="svg"
                  data-testid="EditIcon" 
                  aria-label="fontSize small">
                    <path 
                      fill="white"
                      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    />
                </svg>
                </button>
             
              <button id="${ele.id}" class="delete-btn">
                <svg
                  class="svg"
                  focusable="false" 
                  aria-hidden="true" 
                  data-testid="DeleteIcon" 
                  aria-label="fontSize small">
                    <path 
                      fill="white"
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                    />
                </svg>
              </button>
              <button id="${ele.id}" class="swap-btn">
                <svg
                  class="svg"
                  focusable="false" 
                  aria-hidden="true" 
                  data-testid="ArrowForwardIcon" 
                  aria-label="fontSize small">
                    <path 
                      fill="white"
                      d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                    />
                </svg>
              </button>
              </div>
            </li>
      `;
    });
    return tmp;
  };

  // html for completed lists container
  const createTmpTwo = (arr) => {
    let tmp = "";
    arr.forEach((ele) => {
      tmp += `
      <li id="${ele.id}" class="list__item">
      <button id="${ele.id}" class="swap-btn">
        <svg
          class="svg"
          focusable="false" 
          aria-hidden="true" 
          data-testid="ArrowBackIcon" 
          aria-label="fontSize small">
          <path 
            fill="white"
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          />
        </svg>
      </button>
      <text class="description2">${ele.title}</text>
      <div class="option__buttons2">
      <button id="${ele.id}" class="edit-btn">
      <svg
        class="svg"
        focusable="false" 
        aria-hidden="true"       
        data-testid="EditIcon" 
        aria-label="fontSize small">
          <path 
            fill="white"
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          />
      </svg>
      </button>
      <button id="${ele.id}" class="delete-btn">
        <svg
          class="svg"
          focusable="false" 
          aria-hidden="true" 
          data-testid="DeleteIcon" 
          aria-label="fontSize small">
            <path 
              fill="white"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
        </svg>
      </button>
      </div>
    </li>
      `;
    });
    return tmp;
  };

  // html for editing list item container
  const editTodo = (arr, id, type) => {
    let tmp = "";
    arr.forEach((ele) => {
      if (+ele.id === +id) {
        if (type === "pending") {
          tmp += `
            <li class="list__item">
              <input type="text" class="description" value="${ele.title}"></input>
              <div class="option__buttons">
                <button id="${ele.id}" class="swap-btn">
                  <svg
                  class="svg"
                  focusable="false" 
                  aria-hidden="true" 
                  data-testid="ArrowForwardIcon" 
                  aria-label="fontSize small">
                    <path 
                      fill="white"
                      d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                    />
                </svg>
                </button>
                <button id="${ele.id}" class="edit-btn">
                <svg
                  class="svg"
                  focusable="false" 
                  aria-hidden="true"      
                  data-testid="EditIcon" 
                  aria-label="fontSize small">
                    <path 
                      fill="white"
                      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    />
                </svg>
                </button>
                <button id="${ele.id}" class="delete-btn">
                  <svg
                    class="svg"
                    focusable="false" 
                    aria-hidden="true"
                    data-testid="DeleteIcon" 
                    aria-label="fontSize small">
                      <path 
                        fill="white"
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      />
                  </svg>
                </button>
              </div>
            </li>
          `;
        } else if (type === "completed") {
          tmp = `
          <li class="list__item">
          <button id="${ele.id}" class="swap-btn">
          <svg
            class="svg"
            focusable="false" 
            aria-hidden="true" 
            data-testid="ArrowBackIcon" 
            aria-label="fontSize small">
            <path 
              fill="white"
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            />
          </svg>
          </button>
          <input type="text" class="description2" value="${ele.title}"></input>
          <div class="option__buttons2">
          <button id="${ele.id}" class="edit-btn">
          <svg
            class="svg"
            focusable="false" 
            aria-hidden="true"       
            data-testid="EditIcon" 
            aria-label="fontSize small">
              <path 
                fill="white"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
              />
          </svg>
          </button>
          <button id="${ele.id}" class="delete-btn">
          <svg
            class="svg"
            focusable="false" 
            aria-hidden="true" 
            data-testid="DeleteIcon" 
            aria-label="fontSize small">
              <path 
                fill="white"
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
              />
          </svg>
          </button>
          </div>
        </li>
          `;
        }
      }
    });

    return tmp;
  };

  return { render, createTmp, domstr1, createTmpTwo, editTodo };
})();

// Model: An object funtion that serves as a data handler
const Model = ((api, view) => {
  // Obtains access to functions from Api in order to perform actions with the database
  const { getTodos, deleteTodo, postTodo, putTodo, swapTodo } = api;

  //State - Holds the states of the two lists and the edit mode
  class State {
    #pendingList = [];
    #completedList = [];
    #editMode = false;

    get editMode() {
      return this.#editMode;
    }

    set editMode(newMode) {
      this.#editMode = newMode;
    }

    get pendinglist() {
      return this.#pendingList;
    }
    set pendinglist(newPendinglist) {
      this.#pendingList = newPendinglist;

      const pendingContainer = document.querySelector(
        view.domstr1.pendingContainer
      );
      const tmp = view.createTmp(this.#pendingList);
      view.render(pendingContainer, tmp);
    }

    get completedlist() {
      return this.#completedList;
    }
    set completedlist(newCompletedlist) {
      this.#completedList = newCompletedlist;

      const completedContainer = document.querySelector(
        view.domstr1.completedContainer
      );
      const tmp2 = view.createTmpTwo(this.#completedList);
      view.render(completedContainer, tmp2);
    }
  }

  // Todo - For the creation of a new list item
  class Todo {
    constructor(title, status) {
      this.title = title;
      this.completed = status;
      this.id = null;
    }
  }

  // Todo2 - For the creation of a new Todo for editing purposes
  class Todo2 {
    constructor(title, status, theId) {
      this.title = title;
      this.completed = status;
      this.id = theId;
    }
  }
  return {
    getTodos,
    postTodo,
    deleteTodo,
    swapTodo,
    putTodo,
    State,
    Todo,
    Todo2,
  };
})(Api, View);

// Controller
//Push the button and something happens
const Controller = ((model, view) => {
  const state = new Model.State();

  const addTodo = () => {
    const btn = document.querySelector(view.domstr1.inputboxbutton);
    function postNewTodo(e) {
      const parent = e.target.closest("div");
      const input = parent.querySelector("input");
      const inputValue = input.value;

      const newTodo = new model.Todo(inputValue, false);

      model.postTodo(newTodo).then((todo) => {
        state.pendinglist = [todo, ...state.pendinglist];
      });
      input.value = "";
    }

    btn.addEventListener("click", postNewTodo);
  };

  const deleteTodo = () => {
    const pendingContainer = document.querySelector(
      view.domstr1.pendingContainer
    );
    pendingContainer.addEventListener("click", (event) => {
      if (event.target.className === "delete-btn") {
        state.pendinglist = state.pendinglist.filter(
          (todo) => +todo.id !== +event.target.id
        );
        model.deleteTodo(event.target.id);
      }
    });

    const completedContainer = document.querySelector(
      view.domstr1.completedContainer
    );
    completedContainer.addEventListener("click", (event) => {
      if (event.target.className === "delete-btn") {
        state.completedlist = state.completedlist.filter(
          (todo) => +todo.id !== +event.target.id
        );
        model.deleteTodo(event.target.id);
      }
    });
  };

  const swap = () => {
    const pendingContainer = document.querySelector(
      view.domstr1.pendingContainer
    );

    pendingContainer.addEventListener("click", (event) => {
      if (event.target.className === "swap-btn") {
        let item = state.pendinglist.filter(
          (todo) => +todo.id === +event.target.id
        );
        state.pendinglist = state.pendinglist.filter(
          (todo) => +todo.id !== +event.target.id
        );
        console.log(item[0].title);
        const newTodo = new model.Todo(item[0].title, true);

        model.deleteTodo(event.target.id).then(
          model.postTodo(newTodo).then((todo) => {
            state.completedlist = [todo, ...state.completedlist];
          })
        );
      }
    });

    const completedContainer = document.querySelector(
      view.domstr1.completedContainer
    );

    completedContainer.addEventListener("click", (event) => {
      if (event.target.className === "swap-btn") {
        let item2 = state.completedlist.filter(
          (todo) => +todo.id === +event.target.id
        );
        state.completedlist = state.completedlist.filter(
          (todo) => +todo.id !== +event.target.id
        );
        console.log(item2[0].title);
        const newTodo = new model.Todo(item2[0].title, false);

        model.deleteTodo(event.target.id).then(
          model.postTodo(newTodo).then((todo) => {
            state.pendinglist = [todo, ...state.pendinglist];
          })
        );
      }
    });
  };

  const editTodo = () => {
    const bothListContainer = document.querySelector(
      view.domstr1.bothListContainer
    );
    bothListContainer.addEventListener("click", (event) => {
      if (event.target.className === "edit-btn") {
        //check state of edit button
        state.editMode = !state.editMode;
        // Get classification of list item - Pending or Completed ??
        let category =
          event.target.parentElement.parentElement.parentElement.className;

        // Use id to get li element which will be updated to an input box
        const element = document.getElementById(event.target.id);

        // We are putting up input box and taking in new dada
        if (state.editMode === true) {
          if (category === "pendinglist__items") {
            let tmp = view.editTodo(
              state.pendinglist,
              event.target.id,
              "pending"
            );
            view.render(element, tmp);
          } else if (category === "completedlist__items") {
            let tmp = view.editTodo(
              state.completedlist,
              event.target.id,
              "completed"
            );
            view.render(element, tmp);
          }
        }

        // We are replacing data and taking off input box
        else if (state.editMode === false) {
          // Obtain li from 2nd click event on edit button
          const parent = event.target.closest("li");

          // Obtain the input box
          const input = parent.querySelector("input");

          // Obtain the value in the input box
          const inputValue = input.value;

          // search PENDING LIST list for item to update
          if (element.offsetParent.className === "pending__list") {
            let curTodo = state.pendinglist.filter(
              (todo) => +todo.id === +event.target.id
            );

            // create new list item
            const newTodo = new model.Todo2(
              inputValue,
              curTodo[0].completed,
              +event.target.id
            );

            // Update todo on db and then on our state list
            model.putTodo(newTodo, event.target.id).then((todo) => {
              // Using rest operator
              state.pendinglist = [todo, ...state.pendinglist];
            });
          }
          // search COMPLTED LIST list for item to update
          else if (element.offsetParent.className === "completed__list") {
            let curTodo = state.completedlist.filter(
              (todo) => +todo.id === +event.target.id
            );
            const newTodo = new model.Todo2(
              inputValue,
              curTodo[0].completed,
              +event.target.id
            );
            // Update todo on db and then on our state list
            model.putTodo(newTodo, event.target.id).then((todo) => {
              state.completedlist = [todo, ...state.completedlist];
            });
          }
        }
      }
    });
  };

  // Retrieves the data from the database and sets the states
  // for the two lists of tasks
  const init = () => {
    const pending = [];
    const completed = [];
    // get all todos
    model.getTodos().then((todos) => {
      todos.forEach((todo) => {
        if (todo.completed === false) {
          pending.push(todo);
        } else {
          completed.push(todo);
        }
      });
      // Set states for both lists
      state.pendinglist = pending;
      state.completedlist = completed;
    });

    addTodo();
    deleteTodo();
    swap();
    editTodo();
    swap2();
  };

  return { init };
})(Model, View);

// Start
Controller.init();
