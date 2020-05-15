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
      from: "enigma",
      to: "secret",
    };
  }

  render() {
    const placeholder = getPlaceholder(this.state.from);
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
            value={convert(this.state)}
            placeholder={convert({
              input: placeholder,
              from: this.state.from,
              to: this.state.to,
            })}
            style={{ height: "100vh" }}
          />
        </Form>
      </div>
    );
  }
}

const regexCache = {};

function convert({ input, from, to }) {
  if (!regexCache[from]) {
    regexCache[from] = new RegExp(
      `${from}(pub|valoper|valoperpub|valcons|valconspub)?1[a-z0-9]+\\b`,
      "g"
    );
  }
  const regex = regexCache[from];

  let output = input;
  const matches = input.match(regex) || [];

  for (const oldAddress of matches) {
    try {
      const canonical = bech32.decode(oldAddress);
      const newPrefix = canonical.prefix.replace(from, to);
      const newAddress = bech32.encode(newPrefix, canonical.words);
      output = output.replace(new RegExp(oldAddress, "g"), newAddress);
    } catch (error) {
      output = output
        .split(oldAddress)
        .join(`||| ${oldAddress} ||| <-- ERROR PARSING THIS ADDRESS!`);

      console.error(error.message);
    }
  }

  return output;
}

function getPlaceholder(from) {
  return JSON.stringify(
    {
      wallet: bech32.encode(
        from,
        bech32.decode("enigma1pnsceh64jyrsfwjd2k865eetmsgg5grw8sma87").words
      ),
      valoper: bech32.encode(
        `${from}valoper`,
        bech32.decode("enigmavaloper1qx5pppsfrqwlnmxj7prpx8rysxm2u5vzqwv3ly")
          .words
      ),
      pub: bech32.encode(
        `${from}pub`,
        bech32.decode(
          "enigmapub1addwnpepqgauy23vhvvr8uezgczuzh7lj64r9ahd4vsshz5fksezk5lw5k6swjskux6"
        ).words
      ),
      valconspub: bech32.encode(
        `${from}valconspub`,
        bech32.decode(
          "enigmavalconspub1zcjduepqj7ygd0gulz2qa03hgzf3ye40pmeyen2z64xjvpkw8mfhuu7j2vcqk6lgcu"
        ).words
      ),
    },
    null,
    4
  );
}

export default App;
