class Router {
  _list = [];
  _groupName = null;

  getList() {
    return this._list;
  }

  set(method, path) {
    this._list.push(
      [
        `${typeof this._groupName === "string" ? `(${this._groupName})` : ""}`,
        `[${method}]`,
        path,
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  group(groupName, cb) {
    const oldName = this._groupName;

    if (typeof oldName === "string") {
      this._groupName = `${oldName} -> ${groupName}`;
    } else {
      this._groupName = groupName;
    }

    cb();

    this._groupName = oldName;
  }
}

const Route = new Router();

Route.set("GET", "/");

Route.group("User Routes", () => {
  Route.set("GET", "/users");
  Route.set("PUT", "/update-users");

  Route.group("Profile Routes", () => {
    Route.set("GET", "/users/:id");
    Route.set("PUT", "/update-users/:id");
  });
});

Route.set("GET", "/final");
