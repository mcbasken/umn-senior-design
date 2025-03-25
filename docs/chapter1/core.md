# Chapter 1: Foundations of Digital Design

## Introduction

Digital design is the foundation upon which modern electronic systems are built.  
From microprocessors and memory units to digital communication systems and embedded controllers,  
digital design principles enable engineers to create efficient, reliable hardware that manipulates binary information.

This chapter introduces essential topics that form the basis of digital logic design.  
Mastering these fundamentals is critical for analyzing and building more complex digital systems in later chapters.

## 1.1 Number Systems and Representations

In digital systems, all information is represented using numbers—primarily in binary form.  
Understanding how these number systems work is essential.

### Common Number Systems

| Number System | Base | Digits Used | Example   |
|---------------|------|-------------|-----------|
| Decimal       | 10   | 0–9         | 245₁₀     |
| Binary        | 2    | 0, 1        | 111101₂   |
| Octal         | 8    | 0–7         | 75₈       |
| Hexadecimal   | 16   | 0–9, A–F    | 2F₁₆      |

**Conversion Tip:**  
To convert binary `1011` to decimal:  
`(1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰) = 8 + 0 + 2 + 1 = 11`

**Simulation Prompt:**  
> Create a simulation where the user inputs a number in one base (e.g., binary) and the system converts it into decimal, octal, and hexadecimal formats.

---

## 1.2 Boolean Algebra and Logic Gates

Boolean algebra deals with variables that have two possible values: 0 (false) and 1 (true).  
It uses logical operations to represent and simplify digital circuits.

### Basic Logic Gates

| Gate | Symbol | Operation         | Expression |
|------|--------|-------------------|------------|
| AND  | ∧      | Logical Multiply  | A ∧ B      |
| OR   | ∨      | Logical Add       | A ∨ B      |
| NOT  | ¬      | Inversion         | ¬A or A'   |

### De Morgan’s Theorems

- ¬(A ∧ B) = ¬A ∨ ¬B  
- ¬(A ∨ B) = ¬A ∧ ¬B

**Simulation Prompt:**  
> Design an interactive simulation where users can input Boolean expressions and see real-time gate-level diagrams.

---

## 1.3 Truth Tables and Logic Expressions

A truth table shows all possible input combinations and their corresponding output.

Example: For the logic function `F = A · ¬B`

| A | B | ¬B | F = A · ¬B |
|---|---|----|------------|
| 0 | 0 | 1  | 0          |
| 0 | 1 | 0  | 0          |
| 1 | 0 | 1  | 1          |
| 1 | 1 | 0  | 0          |

---

## 1.4 SOP and POS Forms

Boolean expressions can be represented in standard formats:

- **Sum of Products (SOP):** A series of AND terms OR’ed together  
  Example: `F = A¬B + AB`

- **Product of Sums (POS):** A series of OR terms AND’ed together  
  Example: `F = (A + B)(A + ¬C)`

---

## 1.5 Karnaugh Maps and Simplification

Karnaugh Maps (K-Maps) are visual tools for simplifying Boolean expressions without algebra.

### 2-Variable K-Map Example

|     | B=0 | B=1 |
|-----|-----|-----|
| A=0 |  0  |  1  |
| A=1 |  1  |  1  |

**Simulation Prompt:**  
> Provide an interactive Karnaugh Map editor where students can input a truth table and visually group terms to minimize the logic.

---

## 1.6 Binary Arithmetic and Two’s Complement

### Unsigned Binary Addition

0101(5) +
0011(3) =
1000(8)


### Two’s Complement for Signed Numbers

To represent -5 in 4-bit two’s complement:

1. Start with +5 → `0101`  
2. Invert bits → `1010`  
3. Add 1 → `1011` → (-5)

**Simulation Prompt:**  
> Design a simulation to perform binary addition and display results in both unsigned and two’s complement formats.

---

## Summary

This chapter covered the fundamental building blocks of digital design:

- Number systems: Binary, octal, decimal, hexadecimal  
- Boolean algebra and logic gates  
- Truth tables and standard Boolean forms (SOP, POS)  
- Karnaugh Maps for simplification  
- Binary arithmetic with signed and unsigned numbers

---

## Quiz: Check Your Understanding

1. **Convert 101101₂ to decimal.**  
   - A) 45  
   - B) 53  
   - C) 57  
   - D) 61  

   ??? Show Answer
       **The correct answer is: A) 45**  
       **Explanation:**  
       Convert binary `101101` to decimal:  
       \[
       (1 \times 2^5) + (0 \times 2^4) + (1 \times 2^3) + (1 \times 2^2) + (0 \times 2^1) + (1 \times 2^0) = 32 + 0 + 8 + 4 + 0 + 1 = 45
       \]  
       Therefore, the correct answer is **A**.

---

2. **Which of the following represents the NOT operation?**  
   - A) +  
   - B) ·  
   - C) ¬  
   - D) ∨  

   ??? Show Answer
       **The correct answer is: C) ¬**  
       **Explanation:**  
       - ¬ (or A′) represents the NOT operation.  
       - A) `+` is OR  
       - B) `·` is AND  
       - D) `∨` is also OR  

---

3. **What is the two’s complement of 0110 (6)?**  
   - A) 1001  
   - B) 1010  
   - C) 1110  
   - D) 1011  

   ??? Show Answer
       **The correct answer is: B) 1010**  
       **Explanation:**  
       To find the two’s complement of `0110`:  
       1. Invert bits: `1001`  
       2. Add 1: `1001 + 0001 = 1010`  
       So, the two’s complement is **1010**, which represents -6.

---

4. **Which of these is a Product of Sums expression?**  
   - A) A + B + C  
   - B) AB + AC  
   - C) (A + B)(A + ¬C)  
   - D) A · B · ¬C  

   ??? Show Answer
       **The correct answer is: C) (A + B)(A + ¬C)**  
       **Explanation:**  
       - Product of Sums means AND’ing multiple OR’d terms.  
       - C is the only expression with multiple OR terms being AND’ed.  
       - A is a single OR term  
       - B is SOP (Sum of Products)  
       - D is a single AND term  

---

5. **How many cells are in a 3-variable Karnaugh Map?**  
   - A) 4  
   - B) 6  
   - C) 8  
   - D) 16  

   ??? Show Answer
       **The correct answer is: C) 8**  
       **Explanation:**  
       A 3-variable Karnaugh Map represents \( 2^3 = 8 \) possible input combinations.  
       - A (4) is for 2-variable K-Maps  
       - D (16) is for 4-variable K-Maps
