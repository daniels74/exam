export const Api = (() => {
  const baseUrl = "http://localhost:3000";
  const pendingPath = "todos";

  function myFetch(url, method, newTodo) {
    var xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status === 200) {
          console.log('SUCCESS', xhr.responseText);
          // if (method === "POST") {
          //   xhr.setRequestHeader("Content-Type", "application/json");
          //   xhr.send(JSON.stringify(newTodo));
          //   return
          // }
          resolve(JSON.parse(xhr.responseText));
        } else {
          console.warn('request_error');
        }
      };
      if (method === "GET") {
        xhr.open('GET', url);
      }
      else if (method === "POST") {
        xhr.open('POST', url);

      }
      xhr.send();
    });
  }

  const getTodos = () =>
    //fetch([baseUrl, pendingPath].join("/")).then((response) => response.json());
    myFetch([baseUrl, pendingPath].join("/"), "GET");

function myFetchPost(newtodo){
    // var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    // var theUrl = [baseUrl, pendingPath].join("/")
    // xmlhttp.open("POST", theUrl);
    // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xmlhttp.send(JSON.stringify(newtodo));
    // return JSON.stringify(newtodo);
  }

  const postTodo = (newtodo) =>
    //myFetchPost(newtodo)
    fetch([baseUrl, pendingPath].join("/"), {
      method: "POST",
      body: JSON.stringify(newtodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());

  const deleteTodo = (id) =>
    fetch([baseUrl, pendingPath, id].join("/"), {
      method: "DELETE",
    });


  // Edit
  const putTodo = (newtodo, id) =>
    fetch([baseUrl, pendingPath, id].join("/"), {
      method: "PUT",
      body: JSON.stringify(newtodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());

  return { getTodos, postTodo, deleteTodo, putTodo, myFetchPost };
})();
