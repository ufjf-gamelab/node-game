**Dice is Odd** is a **modifier-type node** that returns a binary result indicating success or failure based on whether the input numeric value is odd.

- **Type:** Modifier (intermediate node)
- **Function:** Checks if the input value is odd
- **Output:** True (success) if odd, False (failure) if not odd

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
- **Default:** Is odd
- **Function:** Name displayed in the modeling board

---

## **Example of Use**

**Scenario:** Simulate a success check where the player succeeds if the value rolled on a **1d10** is odd.

### **1. Data Generator Node Properties:**

- Dice Generator: Minimum Value `1`, Maximum Value `10`

### **2. Connection with other nodes:**

- Connect the **Dice Generator** node to the **Dice is Odd** node
- Connect the **Dice is Odd** node to the **Success/Failure Histogram** node

<img src="/images/is-odd.png" width="500px" alt="Example usage of the Dice is Odd node"/>

---

## **Notes**

- Useful for binary outcome mechanics based on the parity (odd/even) of dice rolls.
