---
order: 322
slug: /wei-zang/coder
title: Coder
description: iCode
tags: code, coding
icon: virus
---

[PageLink url="https://ed-tech.co/courses/python" icon="right" iconAlign="right" title="Next" description="Learn Python"]  

```javascript
  const handleBetragBlur = () => {
    let num = parseFloat(betragInput.replace(',', '.'));
    if (isNaN(num) || num < 1) num = 1;
    if (num > 10_000_000) num = 10_000_000;
    setBetragInput(num.toFixed(2));
    handleChange('Betrag', num);
  };
```
