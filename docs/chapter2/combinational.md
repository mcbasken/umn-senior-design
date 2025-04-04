# Combinational Logic – Multiplexers and Demultiplexers

## Overview

**Multiplexers (MUX)** select one of many input signals and forward it to a single output, based on select lines.  
**Demultiplexers (DEMUX)** take a single input and route it to one of many outputs based on select lines.

These components are key in routing, data selection, and building scalable digital systems.

---

## 4-to-1 Multiplexer

**Inputs:** `I0`, `I1`, `I2`, `I3`  
**Select Lines:** `S1`, `S0`  
**Output:** `Y`

| S1 | S0 | Y (Output) |
|----|----|------------|
| 0  | 0  | I0         |
| 0  | 1  | I1         |
| 1  | 0  | I2         |
| 1  | 1  | I3         |

**Logic Equation:**

Y = (¬S1 ∧ ¬S0 ∧ I0) ∨ (¬S1 ∧ S0 ∧ I1) ∨ (S1 ∧ ¬S0 ∧ I2) ∨ (S1 ∧ S0 ∧ I3)


---

## 1-to-4 Demultiplexer

**Input:** `D`  
**Select Lines:** `S1`, `S0`  
**Outputs:** `Y0`, `Y1`, `Y2`, `Y3`

| S1 | S0 | Active Output |
|----|----|----------------|
| 0  | 0  | Y0 = D         |
| 0  | 1  | Y1 = D         |
| 1  | 0  | Y2 = D         |
| 1  | 1  | Y3 = D         |

All other outputs = 0.

---

## 🧪 MicroSim Simulation Prompt

> **Task:** Create a 4-to-1 multiplexer using basic gates (AND, OR, NOT) in MicroSim.  
> Use switches for inputs `I0–I3` and select lines `S0–S1`. Connect the output to an LED.  
> Observe how different select values choose the corresponding input.

---

## 📝 Quick Quiz

1. How many select lines are needed for an 8-to-1 MUX?  
2. What is the output of a DEMUX when no select lines are high?  
3. (True/False) A MUX routes a single input to one of many outputs.  
4. Complete the table for a 2-to-1 MUX:

| S | I0 | I1 | Y |
|---|----|----|---|
| 0 | 1  | 0  | ? |
| 1 | 1  | 0  | ? |

