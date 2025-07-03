**Dice Is Even** is a **modifier-type node** that returns a binary result indicating success or failure based on whether the input numeric value is even.

- **Type:** Modifier (intermediate node)
- **Function:** Checks if the input value is even
- **Output:** True (success) if even, False (failure) if not even

---

## **Properties**

### **Node ID**

- **Type:** Text
- **Default:** Random ID
- **Function:** Unique identifier of the node

### **Status**

- **Type:** `Finished` | `Idle` | `Error` | `Loading` | `Missing data`
- **Default:** `Idle`
- **Function:** Indicates the current state of the node

### **Name**

- **Type:** Text
- **Default:** Is even
- **Function:** Name displayed in the modeling board

---

## **Example of Use**

**Scenario:** Simulate a success check where the player succeeds if the value rolled on a **1d10** is even.

### **1. Data Generator Node Properties:**

- Dice Generator: Minimum Value `1`, Maximum Value `10`

### **2. Connection with other nodes:**

- Connect the **Dice Generator** node to the **Dice Is Even** node
- Connect the **Dice Is Even** node to the **Success/Failure Histogram** node

<img src="/node-crafter/doc-images/is-even.png" width="500px" alt="Example usage of the Dice Is Even node"/>

---

## **Notes**

- Useful for binary outcome mechanics based on the parity (even/odd) of dice rolls.
