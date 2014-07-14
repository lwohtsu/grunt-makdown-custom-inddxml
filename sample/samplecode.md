##sample test code

```scss
.sample-large {
  @extend .sample-base;
}
```

```cs
[AddComponentMenu("Utage/ADV/UiMessageWindow")]
public class AdvUguiMessageWindow : MonoBehaviour
{
  /// <summary>ADVエンジン</summary>
  [SerializeField]
  AdvEngine engine;

  /// <summary>本文テキスト</summary>
  [SerializeField]
  Text text;

  /// <summary>名前表示テキスト</summary>
  [SerializeField]
  Text nameText;

  /// <summary>ウインドウのルート</summary>
  [SerializeField]
  GameObject rootChildren;
}
```
