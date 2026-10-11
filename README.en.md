English | [中文](README.md)

## Introduction

Anyone who has used Excel's formatting features knows how powerful its format definition capabilities are — almost any display format you can imagine is achievable.

![image](https://www-kodphp-cn.oss-cn-beijing.aliyuncs.com/1577073811148.png)

Since front-end applications also need a fully-featured custom formatting extension, **vue-text-format** ports Excel's formatting capabilities to Vue. It lets you conveniently transform how data is displayed on the page.

Usage is simple: extend Vue with the custom `v-format` directive, bind a format string, and the inner text will be converted automatically.

## Usage

### Installation

```bash
npm install vue-text-format --save
```

Import the plugin's `main.js` in your entry file.

#### Vue 3 — import via `use()`

```javascript
import { createApp } from 'vue'
import format from 'vue-text-format';
import App from './App.vue';

const app = createApp(App)

app
  .use(format)
  .mount('#app')
```

#### Vue 2 — import via `use()`

```javascript
import Vue from 'vue';
import format from 'vue-text-format';
import App from './App.vue';

Vue.use(format); // register the plugin

new Vue({
  render: h => h(App)
}).$mount('#app');
```

### How to Use

**Method 1: `v-format` directive** — Pass the desired format string via `v-format`

```html
<div v-format="'0.##%'">0.123</div>
```

**Method 2: Function call** — A `$textFormat` function is also exposed on the Vue prototype

```javascript
import { defineComponent, getCurrentInstance } from 'vue';

export default {
    name: 'home',
    mounted() {
        const { proxy } = getCurrentInstance();
        let newVal = proxy.$textFormat(0.123, '0.##%');
        // Result: "12.3%"
    }
}
```

### Examples

Here are a few examples to show how comprehensive and powerful the formatting engine is:

```html
<div v-format="'0.##%'">0.123</div>
<!-- Displays: 12.3% (percentage conversion) -->

<div v-format="'0.00%'">0.123</div>
<!-- Displays: 12.30% (percentage with fixed decimal places) -->

<div v-format="'#,##0.00'">1200000</div>
<!-- Displays: 1,200,000.00 (thousand separators) -->

<div v-format="'¥#,##0.00'">1200000</div>
<!-- Displays: ¥1,200,000.00 (currency prefix) -->

<div v-format="'0.00E+00'">1200000</div>
<!-- Displays: 1.20E+06 (scientific notation, fixed places) -->

<div v-format="'0.##E+##'">1200000</div>
<!-- Displays: 1.2E+6 (scientific notation, variable places) -->

<div v-format="'0000-00-00'">20180512</div>
<!-- Displays: 2018-05-12 (date reformatting) -->

<div v-format="'000-0000-0000'">13812345678</div>
<!-- Displays: 138-1234-5678 (phone number formatting) -->

<div v-format="'YYYY-MM-DD'">1562838244</div>
<!-- Displays: 2019-07-11 (date from timestamp) -->

<div v-format="'??/??'">0.28</div>
<!-- Displays: 7/25 (approximate fraction, two-digit denominator) -->

<div v-format="'?/?'">0.28</div>
<!-- Displays: 2/7 (approximate fraction, one-digit denominator) -->
```

The format codes follow a complete declaration syntax. A full reference is below. If you find it complex, there are easier ways to use it:

#### 1. Copy from Excel

You can copy the format string directly from Excel. In Excel, open **Format → Cells → Number → Custom** — the format code will appear in the input box there. Just copy and paste it into `v-format`.

#### 2. Common Code Appendix

The sections below include many examples. By copying and combining these, you can solve the vast majority of formatting needs.


# Format Code Reference

For more custom formatting, you need to understand the format code syntax. You can also refer to any online guide on Excel custom number formats.

### 1. [ `#` ] Digit Placeholder

Displays only significant zeros, suppressing leading and trailing insignificant zeros. If the number of digits after the decimal point exceeds the number of `#` placeholders, the value is rounded accordingly.

| Code     | Number    | Display  |
|----------|-----------|----------|
| ###.##   | 12.1      | 12.1     |
| ###.##   | 12.1263   | 12.13    |


### 2. [ `0` ] Digit Placeholder

If the cell content has more digits than placeholders, the actual number is shown. If it has fewer, it is padded with zeros.

| Code    | Number    | Display   | Notes |
|---------|-----------|-----------|-------|
| 00000   | 1234567   | 1234567   |       |
| 00000   | 123       | 00123     |       |
| 00.000  | 100.14    | 100.140   |       |
| 00.000  | 1.1       | 01.100    |       |


### 3. [ `?` ] Digit Placeholder

Adds spaces for insignificant zeros on either side of the decimal point so that decimal points align when using a fixed-width font. Also used for fractions with varying-length numerators/denominators.

Example: Code `??.??` with `12.121` → displays `12.12`
Example: Code `???.???` with `12.121` → displays ` 12.121` (space-padded)
Example: Code `???.????` with `12.121` → displays `12.121 ` (space-padded)

| Code      | Number    | Display            |
|-----------|-----------|--------------------|
| ??.??     | 12.121    | 12.12              |
| ???.???   | 12.121    | ` 12.121` (padded) |
| ???.????  | 12.121    | ` 12.121 ` (padded)|


### 4. [ `.` ] Decimal Point

| Code    | Number    | Display   |
|---------|-----------|-----------|
| 0.#     | 11.23     | 11.2      |
| 0.#     | 11        | 11        |
| 0.00    | 3         | 3.00      |
| 0.##    | 3         | 3         |
| 0.00%   | 3         | 300.00%   |
| 0.##%   | 3         | 300%      |

> **Difference from Excel**: When all placeholders after the decimal point are `#` and the formatted number is an integer, the trailing decimal point is omitted rather than showing something like `3.`.
>
> Example: `3.000001` with format `#.####` → displays `3` (not `3.`)
>
> Similarly: `0.000001` with format `###.####` → displays an empty string `""` (not `.`)


### 5. [ `%` ] Percentage

Multiplies the number by 100 and appends the `%` sign.

Example: Code `#%` — `0.1` displays as `10%`

| Code    | Number    | Display   |
|---------|-----------|-----------|
| #%      | 0.1       | 10%       |
| #.#%    | 0.131     | 13.1%     |
| #.##%   | 0.131     | 13.1%     |
| #.#0%   | 0.131     | 13.10%    |


### 6. [ `,` ] Thousand Separator

| Code     | Number    | Display    |
|----------|-----------|------------|
| #,###    | 12000     | 12,000     |

When `,` is followed by nothing, the number is divided by 1000.

| Code      | Number       | Display      | Notes                                          |
|-----------|--------------|--------------|------------------------------------------------|
| #,        | 10000        | 10           |                                                |
| #,"k"     | 123123       | 123k         |                                                |
| #,,       | 1000000      | 1            |                                                |
| 0,.#      | 12345        | 12.3         |                                                |
| #.00,     | 12345        | 12.35        | Display as thousands, rounded to 2 decimals     |
| "CNY "#,##0,,"M" | 1234567890 | CNY 1,235M |                                     |


### 7. Positive / Negative / Zero / Text Sections

Format strings can have up to four sections, separated by semicolons:

`Positive format; Negative format; Zero format; Text format`

- If two sections are given: the first applies to positive numbers and zero, the second to negative numbers.
- If one section is given: all numbers use that format.
- To skip a section, leave it empty (just use the semicolon).

| Code          | Number    | Display   |
|---------------|-----------|-----------|
| #;-#;"empty"  | 1         | 1         |
| #;-#;"empty"  | 0         | empty     |
| #;-#;"empty"  | -1        | -1        |


### 8. Scientific Notation

| Code       | Number     | Display    |
|------------|------------|------------|
| 0.##E+##   | 1200000    | 1.2E+6     |
| 0.00E+00   | 1200000    | 1.20E+06   |


### 9. [ `/` ] Fractions

- The number of displayed fraction digits is determined by the number of digit placeholders to the right of `/`, supporting up to 3 digits.
- The result is the closest approximate fraction to the original value.

| Code        | Number    | Display    |
|-------------|-----------|------------|
| ?/?         | 0.2761    | 2/7        |
| ??/??       | 0.2761    | 21/76      |
| ???/???     | 0.2761    | 119/431    |
| 00/??       | 0.28      | 07/25      |
| ??/??       | 1.28      | 32/25      |
| ?/??        | 1.28      | 32/25      |
| \# ??/??    | 1.28      | 1  7/25    |
| \# ??/??    | 0.28      |    7/25    |


### 10. [ `@` ] Text Placeholder

When a single `@` is used, it inserts the original text value.

| Code          | Text   | Display    |
|---------------|--------|------------|
| "Group"@"Dept"| Finance| GroupFinanceDept |

Multiple `@` characters repeat the text.

| Code   | Text   | Display      |
|--------|--------|--------------|
| @@@    | Finance| FinanceFinanceFinance |


### 11. [ `*` ] Fill Character

Repeats the character following `*` until the remaining column width is filled.

| Code     | Text   | Display               |
|----------|--------|-----------------------|
| @*-      | ABC    | ABC-------------------|
| ¥*-#     | 123123 | ¥----------123123     |

Can also be used to simulate password masking:

| Code | Text | Display          |
|------|------|------------------|
| **   | 123  | ************     |


### 12. [ `\` ] and [ `""` ] Literal Characters

Use these to display the character that follows.

- `"text"` — displays the text inside the double quotes.
- `\` — displays the next single character. Same purpose as `"text"` but for single characters.

| Code         | Number    | Display       |
|--------------|-----------|---------------|
| #\yuan       | 123123    | 123123yuan    |
| #" CNY"      | 123123    | 123123 CNY    |


### 13. [ `[Color]` ]

Displays characters in the specified color. Eight named colors are supported: **Red, Black, Yellow, Green, White, Blue, Cyan, Magenta**.

Example: Code `[Cyan];[Red];[Yellow];[Blue]` — positive numbers display in cyan, negatives in red, zeros in yellow, and text in blue.

`[ColorN]` — references a color from the palette, where `N` is an integer between 0 and 56.

| Code                      | Number | Display     |
|---------------------------|--------|-------------|
| #,##0.00;[Blue]-#,##0.00 | 1      | 1           |
| #,##0.00;[Blue]-#,##0.00 | -1     | -1 (blue)   |


### 14. Conditions

You can apply formatting based on cell value conditions. Conditional formatting supports up to three conditions — two explicit ones and an "all others" fallback. Conditions go inside square brackets `[...]` and must be simple comparisons.

<table>
<thead>
    <tr>
        <th>Code</th>
        <th>Number</th>
        <th>Display</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>[>1]"Up";[=1]"Flat";"Down"</td>
        <td>1.2</td>
        <td>Up</td>
    </tr>
    <tr>
        <td>[>1]"Up";[=1]"Flat";"Down"</td>
        <td>1</td>
        <td>Flat</td>
    </tr>
    <tr>
        <td>[>1]"Up";[=1]"Flat";"Down"</td>
        <td>0.8</td>
        <td>Down</td>
    </tr>
    <tr>
        <td>[>1][Green];[=1][Yellow];[Red]</td>
        <td>1.2</td>
        <td style="color:green">1.2</td>
    </tr>
    <tr>
        <td>[>1][Green];[=1][Yellow];[Red]</td>
        <td>1</td>
        <td style="color:yellow">1</td>
    </tr>
    <tr>
        <td>[>1][Green];[=1][Yellow];[Red]</td>
        <td>0.8</td>
        <td style="color:red">0.8</td>
    </tr>
</tbody>
</table>

| Operator | Meaning        |
|----------|----------------|
| \=       | Equal to       |
| \>       | Greater than   |
| \<       | Less than      |
| \>=      | Greater or equal |
| \<=      | Less or equal  |
| \<>      | Not equal to   |


### 15. [ `!` ] Escape Character

Since double quotes are used as special characters in format codes, you cannot display a literal `"` directly. To show a double quote, prefix it with `!` — use `!"`.

Example: Code `!"#!"` — `10` displays as `"10"`

| Code    | Number | Display |
|---------|--------|---------|
| !"#!"   | 10     | "10"    |


### 16. Date and Time Codes

Date/time codes work with 10-digit or 13-digit Unix timestamps.

- `YYYY` or `yyyy` — 4-digit year (1900–9999)
- `YY` or `yy` — 2-digit year (00–99)
- `MM` or `M` — 2-digit or 1-digit month (01–12 / 1–12)
- `MMM` — English month abbreviation (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)
- `DD` or `D` — 2-digit or 1-digit day (01–31 / 1–31)
- `DDDD` — Full Chinese weekday name (e.g., 星期一, 星期二). Note: outputs Chinese text.
- `DDD` — Abbreviated Chinese weekday name (e.g., 周一, 周二). Note: outputs Chinese text.
- `AM/PM` or `上午/下午` — AM or PM indicator
- `AAAA` — Chinese weekday name
- `H` or `HH` — 1-digit or 2-digit hour (0–23 / 01–23)
- `m` or `mm` — 1-digit or 2-digit minute (0–59 / 01–59)
- `s` or `ss` — 1-digit or 2-digit second (0–59 / 01–59)

Example: Code `YYYY-MM-DD` — Jan 10, 2005 displays as `2005-01-10`
Example: Code `YY-M-D` — Oct 10, 2005 displays as `05-1-10`
Example: Code `HH:mm:ss` — `23:1:15` displays as `23:01:15`

| Code          | Number     | Display    |
|---------------|------------|------------|
| YYYY-MM-DD    | 1562838244 | 2019-07-11 |
| YY-MM-DD      | 1562838244 | 19-07-11   |
| HH:mm:ss      | 1562838244 | 17:44:04   |


### 17. [ `_` ] Add a Space

`_` followed by a character adds a space with the same width as that character.

| Code     | Number    | Display      |
|----------|-----------|--------------|
| #_yuan   | 123123    | 123123 yuan  |



## Future Plans

More advanced Excel format features will be added over time. Here are some common scenarios that may be supported in the future:

### Special Number Displays

**Chinese lowercase numerals** — `[DBNum1][$-804]G/General`

- `1` → `一`
- `13` → `一十三`

**Chinese uppercase numerals** — `[DBNum2][$-804]G/General`

- `1` → `壹`
- `13` → `壹拾叁`

**Mixed Chinese-Arabic numerals** — `[DBNum3][$-804]G/General`

- `123` → `1百2十3`

### Special Notes

Because of the way format codes are parsed, some characters are reserved as keywords. For example, `=TEXT(A1,"b0000")` would produce an error because `b` is a reserved keyword — it represents the Buddhist calendar year (BB = 2-digit Buddhist year, BBBB = 4-digit Buddhist year, effective for dates after 1900).

To display the literal character `b`, wrap it in quotes: `=TEXT(A1,"""b""0000")`, or in format-code syntax: `"b"0000`. Other reserved keywords include `d`, `e`, and similar characters used in date/time codes.
