**Between Range Dice** is a **modifier-type node** responsible for verifying whether input values fall within a defined range (including the boundaries). It is useful for representing conditions where a value must lie between two limits to be considered a success.

- **Type:** Modifier (intermediate node)
- **Function:** Checks whether the value is within two defined limits
- **Output:** True (success) if within the range, False (failure) if outside

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
- **Default:** Between Range Dice
- **Function:** Name displayed on the modeling board

### **Minimum Value**

- **Type:** Integer
- **Default:** `1`
- **Function:** Lower bound of the range (inclusive)

### **Maximum Value**

- **Type:** Integer
- **Default:** `2`
- **Function:** Upper bound of the range (inclusive)

---

## **Usage Example**

**Scenario:** Simulate a resistance test where the value is only considered a success if it is between `3` and `5`, inclusive.

### **1. Dice Generator Properties:**

- Minimum Value: `1`
- Maximum Value: `6`

### **2. Between Range Dice Properties:**

- Minimum Value: `3`
- Maximum Value: `5`

### **3. Connection with other nodes:**

- Connect **Dice Generator** to the **Between Range Dice** node
- Connect **Between Range Dice** to the **Histogram** node

<img src="/node-crafter/doc-images/dice-between-interval.png" width="500px" alt="Example usage of Between Range Dice"/>

---

## **Notes**

- Useful for representing range checks, such as specific success or failure conditions in games.
- Can be combined with other logic-type modifiers such as OR and AND to build more complex rules.
