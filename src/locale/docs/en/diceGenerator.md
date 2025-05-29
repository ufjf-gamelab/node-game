**Dice Generator** is a **generator-type node** responsible for simulating dice rolls within a defined range. It is the **starting point** for any simulation involving randomness with dice, such as attack systems, skill checks, or any mechanics that rely on dice rolls.

- **Type:** Generator (initial node, does not depend on other nodes).
- **Function:** Produces random integer values within a configurable range.
- **Output:** Integer numbers between the defined minimum and maximum values.

---

## **Properties**

### **Minimum Value**

- **Type:** Integer.
- **Default:** `1`.
- **Function:** Defines the smallest possible value the dice can generate.

### **Maximum Value**

- **Type:** Integer (must be > minimum value).
- **Default:** `6`.
- **Function:** Defines the largest possible value the dice can generate.

---

## **Usage Example**

**Scenario:** Simulate a basic attack in an RPG using a 20-sided die (1d20) where the minimum hit requirement is **12**.

### **1. Configuring the Dice Generator:**

- **Minimum Value:** `1`
- **Maximum Value:** `20`

### **2. Connecting to Other Nodes:**

- Connect it to a **Success** node configured to check for attack hits (values ≥ `12`).
- Finally, link the **Success** node to a **Histogram** to visualize the simulation results' distribution.

<img src="/images/generator-success.png" width="500px" style="margin: 0 auto" alt="Dice Generator → Dice Success → Histogram"/>

---

## **Notes**

- The **Dice Generator** is always the **first node** in a simulation chain with dices.
- It **has no input**—only an output—since it generates random values independently.
- Can be used alone for quick tests or combined with modifiers for complex rules.
