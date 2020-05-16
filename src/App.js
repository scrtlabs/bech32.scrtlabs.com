import React from "react";
import { Form, TextArea, Input, Icon } from "semantic-ui-react";
import bech32 from "bech32";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      from: "",
      to: "",
    };
  }

  render() {
    const placeholder = getPlaceholder(this.state.from);
    return (
      <div>
        <Form style={{ display: "flex", height: "4em" }}>
          <Input
            value={this.state.from}
            placeholder="from: enigma"
            style={{ padding: "0.4%", flex: 1 }}
            onChange={(_, { value }) =>
              this.setState({ from: value.toLowerCase() })
            }
          />
          <Input
            value={this.state.to}
            placeholder="to: secret"
            style={{ padding: "0.4%", flex: 1 }}
            onChange={(_, { value }) =>
              this.setState({ to: value.toLowerCase() })
            }
          />
        </Form>
        <Form
          style={{ display: "flex", height: "calc(100vh - (4em + 1.35em))" }}
        >
          <TextArea
            onChange={(_, { value }) => this.setState({ input: value })}
            placeholder={placeholder}
            style={{ margin: "0.2% 0.4% 0.6% 0.4%", resize: "none" }}
          />
          <TextArea
            value={convert(this.state.input, this.state.from, this.state.to)}
            placeholder={convert(placeholder, this.state.from, this.state.to)}
            style={{ margin: "0.2% 0.4% 0.6% 0.4%", resize: "none" }}
          />
        </Form>
        <div
          style={{
            height: "1.35em",
            width: "100%",
            backgroundColor: "#e7e7e7",
            color: "black",
            textAlign: "center",
            position: "fixed",
            left: 0,
            bottom: 0,
          }}
        >
          Made with <Icon style={{ color: "red" }} name="heart" />
          by Team Enigma{" "}
          <a
            href="https://github.com/enigmampc/Bech32Converter"
            target="_blank"
            style={{ color: "black" }}
          >
            <Icon name="github" />
          </a>
        </div>
      </div>
    );
  }
}

const regexCache = {};
function convert(input = "", from, to) {
  from = from || "enigma";
  to = to || "secret";

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
        .join(
          `||| ${oldAddress} ||| <-- ERROR CONVERTING THIS ADDRESS: ${error.message}`
        );

      console.error(error);
    }
  }

  return output;
}

function getPlaceholder(from) {
  from = from || "enigma";

  try {
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
  } catch (err) {
    return err.message;
  }
}

export default App;
