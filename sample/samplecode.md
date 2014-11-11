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

```objectivec
import UIKit

class ViewController: UIViewController {
                            
    @IBOutlet weak var mySlider: UISlider!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        mySlider.setThumbImage(
            UIImage(named: "slider_thumb"),
            forState: .Normal
        )
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
```

```swift
extension MyClass : Interface {
    class func unarchiveFromFile<A>(file : A, (Int,Int) -> B) -> SKNode? {
        let path: String = bundle.pathForResource(file, ofType: "file\(name + 5).txt")
        let funnyNumber = 3 + 0xC2.15p2 * (1_000_000.000_000_1 - 000123.456) + 0o21
        var sceneData = NSData.dataWithContentsOfFile(path, options: .DataReadingMappedIfSafe, error: nil)
        /* a comment /* with a nested comment */ and the end */
    }
    @objc override func shouldAutorotate() {
        return true
    }
}
```
