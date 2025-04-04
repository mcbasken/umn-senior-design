# Sequential Logic – Flip-Flops and Registers

## Overview

Sequential logic circuits store and process information based on both current inputs and past states.  
**Flip-flops** are the basic memory elements in sequential logic and are used to build **registers**, **counters**, and more complex storage devices.

---

## D Flip-Flop

A **D (Data) flip-flop** stores the input value `D` on the rising edge of the clock signal.

| CLK (↑ edge) | D | Q (Next State) |
|--------------|---|----------------|
| Rising       | 0 | 0              |
| Rising       | 1 | 1              |

**Characteristic Equation:**

Q(next) = D


---

## JK Flip-Flop

The **JK flip-flop** can set, reset, or toggle its output depending on the inputs:

| J | K | Q(next)      |
|---|---|--------------|
| 0 | 0 | No change    |
| 0 | 1 | 0 (Reset)    |
| 1 | 0 | 1 (Set)      |
| 1 | 1 | Toggle (¬Q)  |

---

## 4-Bit Register

A **register** is a group of flip-flops sharing a common clock signal.  
A **4-bit register** uses 4 D flip-flops to store a 4-bit word.

**Inputs:** `D0–D3`  
**Clock:** Shared edge-triggered clock  
**Outputs:** `Q0–Q3`

---

## 🧪 MicroSim Simulation Prompt

> **Task:** Build a 4-bit register using four D flip-flops in MicroSim.  
> - Connect switches to inputs `D0–D3`.  
> - Use one button as the clock input.  
> - Attach LEDs to outputs `Q0–Q3`.  
> Observe how data is stored on the rising edge of the clock.

---

## 📝 Quick Quiz

1. What is the output of a D flip-flop when D = 1 and the clock has a rising edge?  
2. Which flip-flop toggles its output when both inputs are 1?  
3. How many D flip-flops are needed to build an 8-bit register?  
4. (True/False) Flip-flops are used only in combinational logic circuits.

