### Text

```jsx
import Text from './Text';

<Text>Nullam pretium ligula</Text>;
```

_`Text`'s `line-height` is set to `normal` to simplify layout; Long text gets truncated... For longer text use [MultiLineText](#multilinetext)._

```jsx
import Text from './Text';
<Text>
  Nullam pretium ligula vitae nunc auctor fermentum. Vivamus iaculis lorem a nisl tempor, eget sodales arcu elementum.
  Aliquam efficitur, turpis eu auctor venenatis, turpis purus lacinia augue, in gravida ipsum tellus bibendum nunc. Cras
  id sollicitudin urna. Nullam pretium ligula vitae nunc auctor fermentum. Vivamus iaculis lorem a nisl tempor, eget
  sodales arcu elementum. Aliquam efficitur, turpis eu auctor venenatis, turpis purus lacinia augue, in gravida ipsum
  tellus bibendum nunc. Cras id sollicitudin urna.
</Text>;
```

### PrimaryText

Extends [Text](#text).

```jsx
import PrimaryText from './PrimaryText';

<PrimaryText>Nullam pretium ligula</PrimaryText>;
```

### SecondaryText

Extends [Text](#text).

```jsx
import SecondaryText from './SecondaryText';

<SecondaryText>Nullam pretium ligula</SecondaryText>;
```

### TertiaryText

Extends [Text](#text).

```jsx
import TertiaryText from './TertiaryText';

<TertiaryText>Nullam pretium ligula</TertiaryText>;
```

### MonetaryAmount

Extends [PrimaryText](#primarytext).

```jsx
import MonetaryAmount from './MonetaryAmount';
<MonetaryAmount>$99.99</MonetaryAmount>;
```

### MultiLineText

Extends [Text](#text).

_The `line-height` property is set for more comfortable reading._

```jsx
import MultiLineText from './MultiLineText';
<MultiLineText>
  Nullam pretium ligula vitae nunc auctor fermentum. Vivamus iaculis lorem a nisl tempor, eget sodales arcu elementum.
  Aliquam efficitur, turpis eu auctor venenatis, turpis purus lacinia augue, in gravida ipsum tellus bibendum nunc. Cras
  id sollicitudin urna. Nullam pretium ligula vitae nunc auctor fermentum. Vivamus iaculis lorem a nisl tempor, eget
  sodales arcu elementum. Aliquam efficitur, turpis eu auctor venenatis, turpis purus lacinia augue, in gravida ipsum
  tellus bibendum nunc. Cras id sollicitudin urna.
</MultiLineText>;
```

### TextRow

_Combine various text styles inside a `TextRow`_

```jsx
import TextRow from './TextRow';
import PrimaryText from './PrimaryText';
import SecondaryText from './SecondaryText';
import TertiaryText from './TertiaryText';

<TextRow>
  <PrimaryText>Nullam pretium ligula</PrimaryText>
  <SecondaryText>vitae nunc</SecondaryText>
  <TertiaryText>auctor fermentum.</TertiaryText>
</TextRow>;
```
