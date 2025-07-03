**Absolute Dice** is a **modifier-type node** used to transform the input numeric values into their absolute values, i.e., removing the negative sign when present.

- **Type:** Modifier (intermediate node)
- **Function:** Applies the absolute value to the input data
- **Output:** Absolute values for each execution

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
- **Default:** Absolute Dice
- **Function:** Name displayed in the modeling board

---

## **Example of Use**

**Scenario:** Simulate the absolute difference in damage between two attacks (1d12 and 1d6) to evaluate the impact variation, regardless of which was higher.

### **1. Properties of the Data Generator nodes:**

- Dice Generator A: Minimum Value `1`, Maximum Value `12`
- Dice Generator B: Minimum Value `1`, Maximum Value `6`

### **2. Properties of the Mathematical node:**

- Operation: Subtraction

### **3. Connection with other nodes:**

- Connect **Dice Generator A** to the **Mathematical** node
- Connect **Dice Generator B** to the **Mathematical** node
- Connect the **Mathematical** node to the **Absolute Dice** node
- Connect the **Absolute Dice** node to the **Histogram** node

<img src="/node-crafter/doc-images/absolute.png" width="500px" alt="Example of use of the Absolute Dice node"/>

---

## **Notes**

- Ideal to ensure that resulting numeric values are always positive, eliminating the impact of negative values in subsequent calculations.
