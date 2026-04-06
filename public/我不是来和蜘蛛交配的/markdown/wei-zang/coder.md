---
order: 322
slug: /wei-zang/coder
title: Coder
description: 程序员
tags: Coder,
icon: virus
---
```javascript
  const handleBetragBlur = () => {
    let num = parseFloat(betragInput.replace(',', '.'));
    if (isNaN(num) || num < 1) num = 1;
    if (num > 10_000_000) num = 10_000_000;
    setBetragInput(num.toFixed(2));
    handleChange('Betrag', num);
  };
```
