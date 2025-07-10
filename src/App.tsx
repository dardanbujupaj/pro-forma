import { useState } from "react";
import "./App.css";

function App() {
  function formCallback(form: HTMLFormElement) {
    form?.reset();
  }

  const [defaultValue, setDefaultValue] = useState("Default input value");

  return (
    <>
      <section>
        <p>This input is tracked using the defaultValue state</p>
        <input
          value={defaultValue}
          onChange={(e) => setDefaultValue(e.currentTarget.value)}
        />
      </section>
      <hr />
      <section>
        <p>
          This input changes the default value with the onInput event when
          pressing ENTER
        </p>
        <input
          name="defaultValue"
          defaultValue={defaultValue}
          onKeyDown={(e) => {
            console.log("keydown");
            if (e.key === "Enter") {
              e.preventDefault();
              console.log("enter");
              setDefaultValue(e.currentTarget.value);
              e.currentTarget.form?.reset();
            }
          }}
        />
      </section>
      <hr />
      <section>
        <p>
          This input changes the default value using react 19 form form action
        </p>
        <form
          action={(data) => {
            const newValue = data.get("defaultValue") as string;
            setDefaultValue(newValue);
          }}
        >
          <input defaultValue={defaultValue} name="defaultValue" />
          <button>submit</button>
        </form>
        <p>
          This makes the input track changes to the default value, while not
          being tracked. Weirdly this only works after the first submit.
        </p>
      </section>

      <hr />
      <section>
        <p>
          We can can make it work from the beginning with a ref callback, that
          resets the form on initial render.
        </p>
        <p>
          This form also shows, that this has nothing to do with using the
          action. Using action in the previous form only has the nice sideeffect
          of resetting the form for us.
        </p>
        <form
          ref={formCallback}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input defaultValue={defaultValue} name="any" />
          <button>submit</button>
        </form>
      </section>
      <hr />
      <section>
        <a href="https://github.com/dardanbujupaj/pro-forma">
          https://github.com/dardanbujupaj/pro-forma
        </a>
      </section>
    </>
  );
}

export default App;
