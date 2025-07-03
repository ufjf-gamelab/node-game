**Dice Generator** is a **generator-type node** responsible for simulating dice rolls within a defined range. It is the **starting point** for any simulation involving randomness with dice, such as attack systems, skill checks, or any mechanics that rely on dice rolls.

- **Type:** Generator (initial node, does not depend on other nodes).
- **Function:** Produces random integer values within a configurable range.
- **Output:** Integer numbers between the defined minimum and maximum values.

---

## **Properties**

### **Node ID**

- **Type:** Text
- **Default:** Random ID
- **Function:** Unique identifier for the node

### **Status**

- **Type:** `Finished` | `Idle` | `Error` | `Loading` | `Missing Data`
- **Default:** `Idle`
- **Function:** Indicates the current state of the node

### **Name**

- **Type:** Text
- **Default:** Dice
- **Function:** Name displayed in the modeling board and the generated chart

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

**Scenario:** Simulate a basic attack in an RPG using a 6-sided die (1d6) that requires a minimum value of 4 to hit.

### **1. Dice Generator Properties:**

- Minimum Value: `1`
- Maximum Value: `6`

### **2. Dice Success Properties:**

- Success equal to or greater than: `4`

### **3. Connecting to other nodes:**

- Connect **Dice Generator** to the **Dice Success** node
- Connect **Dice Success** to the **Histogram** node

<img src="/node-crafter/doc-images/generator-success.png" width="500px" alt="Dice Generator → Dice Success → Histogram"/>

---

## **Notes**

- The **Dice Generator** is always the **first node** in a simulation chain with dice.
- It **has no input**—only an output—since it generates random values independently.
- Can be used alone for quick tests or combined with modifiers for complex rules.
