import React from "react";
import { Form, TextArea } from "semantic-ui-react";
import bech32 from "bech32";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }

  render() {
    return (
      <div>
        <Form style={{ display: "flex" }}>
          <TextArea
            onChange={(event, data) => {
              this.setState({ input: data.value });
            }}
            placeholder={placeholder}
            style={{ height: "100vh" }}
          />
          <TextArea
            value={convert(this.state.input)}
            placeholder={convert(placeholder)}
            style={{ height: "100vh" }}
          />
        </Form>
      </div>
    );
  }
}

const regex = /enigma(pub|valoper|valoperpub|valcons|valconspub)?1[a-z0-9]+?\b/g;
function convert(input) {
  let output = input;
  const matches = input.match(regex) || [];

  for (const oldAddress of matches) {
    try {
      const canonical = bech32.decode(oldAddress);
      const newPrefix = canonical.prefix.replace("enigma", "secret");
      const newAddress = bech32.encode(newPrefix, canonical.words);
      output = output.replace(new RegExp(oldAddress, "g"), newAddress);
    } catch (error) {
      output = output.replace(
        new RegExp(oldAddress, "g"),
        `||| ${oldAddress} ||| <-- ERROR PARSING THIS ADDRESS!`
      );

      console.error(error.message);
    }
  }

  return output;
}

const placeholder = JSON.stringify(
  {
    name: "example",
    type: "local",
    address: "enigma1pnsceh64jyrsfwjd2k865eetmsgg5grw8sma87",
    pubkey:
      "enigmapub1addwnpepqgauy23vhvvr8uezgczuzh7lj64r9ahd4vsshz5fksezk5lw5k6swjskux6",
  },
  null,
  4
);

export default App;
