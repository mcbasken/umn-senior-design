const fsmConcepts = {
  "What is an FSM": `
FSM (Finite State Machine):
- A logic model that transitions between defined states based on inputs and clock edges.
- Used in processors, communication protocols, and controller logic.

Core Components:
- States: Modes of operation (e.g., IDLE, LOAD, DONE)
- Transitions: Movement between states based on input
- Outputs: Determined by current state (Moore) or state + input (Mealy)
  `,

  "Moore vs Mealy FSM": `
Moore FSM:
- Output depends only on current state
- Stable outputs, changes on clock edge

Mealy FSM:
- Output depends on state and input
- May react faster (fewer states), but more complex

Comparison:
| Characteristic     | Moore        | Mealy              |
|--------------------|--------------|--------------------|
| Output Depends On  | State        | State + Input      |
| Timing             | On clock edge| Immediate on input |
| Design Complexity  | Simpler      | May use fewer states |
  `,

  "State Diagram (Moore Example)": `
[IDLE] -- go=1 --> [LOAD]
[LOAD] -- done=1 --> [DONE]
[DONE] -- reset=1 --> [IDLE]
  `,

  "State Encoding": `
State Encoding Techniques:
- Binary: Compact but complex logic
- One-hot: 1 flip-flop per state, easier synthesis
- Gray Code: Only 1 bit changes, good for async

One-hot Example:
parameter IDLE = 3'b001, LOAD = 3'b010, DONE = 3'b100;
reg [2:0] state, next_state;
  `,

  "FSM Implementation Tips": `
FSM Implementation Tips:
- Use 'parameter' to name states
- Separate state transition and output logic
- Use 'always @(posedge clk)' for transitions
- Initialize FSM using reset logic
- Simulate edge cases to validate transitions
  `
};

function showFSMConcept(topic) {
  if (fsmConcepts[topic]) {
    console.log("=== " + topic + " ===");
    console.log(fsmConcepts[topic]);
  } else {
    console.log("Topic not found. Try one of these:");
    console.log(Object.keys(fsmConcepts).join("\n"));
  }
}

// Example usage
showFSMConcept("What is an FSM");
showFSMConcept("Moore vs Mealy FSM");
showFSMConcept("State Diagram (Moore Example)");
showFSMConcept("State Encoding");
showFSMConcept("FSM Implementation Tips");
