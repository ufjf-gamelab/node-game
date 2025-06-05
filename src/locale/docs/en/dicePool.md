**Dice Pool** is a **modifier-type node** used to group the results of two other numeric nodes into a single pool. It is ideal for representing systems that combine multiple dice or numeric sources, such as grouped rolls in tabletop games.

- **Type:** Modifier (intermediate node)
- **Function:** Groups the values from two input nodes into a single set
- **Output:** List of numeric results grouped by execution pairs

---

## **Properties**

### **Node ID**

- **Type:** Text
- **Default:** Random ID
- **Function:** Unique identifier of the node

### **Status**

- **Type:** Status
- **Default:** `IDLE`
- **Function:** Indicates the current state of the node:
  - `IDLE`: Ready to use
  - `LOADING`: Calculating results
  - `FINISHED`: Successfully completed
  - `ERROR`: An error occurred
  - `MISSING DATA`: Missing input data or properties

### **Name**

- **Type:** Text
- **Default:** Pool
- **Function:** Name displayed in the modeling board

---

## **Usage Example**

**Scenario:** Simulate a damage system where the player rolls two six-sided dice (2d6) and sums the result to determine total damage.

### **1. Dice Generator Properties:**

- Dice A: Minimum Value `1`, Maximum Value `6`
- Dice B: Minimum Value `1`, Maximum Value `6`

### **2. Connection with other nodes:**

- Connect **Dice A** to **Dice Pool**
- Connect **Dice B** to **Dice Pool**
- Connect **Dice Pool** to **Dice Pool Sum**
- Connect **Dice Pool Sum** to **Histogram**

<img src="/images/dice-pool.png" width="500px" alt="Example usage of Dice Pool with Dice Pool Sum"/>

---

## **Notes**

- Useful for representing mechanics with multiple simultaneous rolls.
- Commonly chained with the **Pool Soma Dado** node to apply value addition.
