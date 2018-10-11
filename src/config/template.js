const templates = {
none: '',
documentation: `::: title
Title Here
:::

::: double

**Name**

**Date**

:::

::: body

### Here is how it works

Information Here
:::

---

    `,
machineInfo: `
::: title
Machine Name
:::

::: nav
[Battery](#battery)

[Ports](#port-locations-and-subcards)

[Storage/Memory](#storage-and-memory)

[Docks](#docks)

[OS](#operating-systems)

[Links](#links)
:::

---

::: double

short info here

![test](./src/config/placeholder.png)

:::

---

### Battery

battery info here

---

### Port Locations and SubCards

::: single
| Model | Port | Location | Part location |
| --- | --- | --- | --- |
| name | --- | --- | --- |
:::

---

### Storage and Memory

List of HDD and Memory

---


### Docks

::: single
| Dock Name | Compatible | 
| --- | --- | 
| name | Yes |
:::

---

### Operating Systems

list of os here

---

### Links

::: double
[HMM or User Guide]()

[PSREF]()
:::
`
}

export default templates;