# Dice Explosion Documentation

**Dice Explosion** is a **modifier node** used to count how many times a specific face (value) for explosion appears consecutively in the input data. This mechanic is commonly found in games where certain dice results trigger additional rerolls or "explosions."

- **Type:** Modifier (intermediate node)
- **Function:** Counts how many dice explosions occur based on a specific value
- **Output:** Number of explosions per execution

---

## **Properties**

### **Node ID**

- **Type:** Text
- **Default:** Random ID
- **Function:** Unique identifier of the node

### **Status**

- **Type:** `Finished` | `Idle` | `Error` | `Loading` | `Missing Data`
- **Default:** `Idle`
- **Function:** Indicates the current state of the node

### **Name**

- **Type:** Text
- **Default:** Dice Explosion
- **Function:** Display name in the modeling board

### **Explode Face**

- **Type:** Integer
- **Default:** `1`
- **Function:** The value that represents the exploding face

---

## **Usage Example**

**Scenario:** Simulate a player dealing multiple damage whenever a `6` is rolled on a **1d6**. Each time a `6` appears, another roll is triggered, and the process repeats while `6` continues to appear.

### **1. Dice Generator Properties:**

- Minimum Value: `1`
- Maximum Value: `6`

### **2. Dice Explosion Properties:**

- Explode: `6`

### **3. Node Connections:**

- Connect the **Dice Generator** to the **Dice Explosion** node
- Connect the **Dice Explosion** node to the **Histogram** node

<img src="/images/dice-explode.png" width="500px" alt="Example usage of Dice Explosion"/>

---

## **Notes**

- Ideal for representing games that use reroll or explosion mechanics based on a specific value.
- Can be combined with the **Dice Pool** node to simulate multiple simultaneous rolls, with explosions counted per group.
- The counting logic registers how many consecutive explosions occur. When the explode face appears in sequence, the count accumulates. Once the sequence is broken, the value is recorded in the histogram. For example, if a pool returns two `6`s in a row followed by a `4`, a single explosion with a value of `2` will be recorded on the X-axis of the histogram.
