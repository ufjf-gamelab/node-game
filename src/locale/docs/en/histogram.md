**Histogram** is a **visualization-type node** that displays the simulation results as a bar chart. It shows how frequently different outcomes occur in your simulations described in the model.

- **Type:** Visualizer (final node in the chain)
- **Function:** Creates charts from the modeled simulation data
- **Output:** Bar chart showing the frequency of the results

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
- **Default:** Histogram
- **Function:** Name displayed in the modeling board and the generated chart

### **Ordering**

- **Type:** Ascending | Descending
- **Default:** Ascending
- **Function:** Sets the order of values displayed in the histogram bar chart

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

- The Histogram must always be placed **last** in the node chain
- It must be connected to the output of another node
