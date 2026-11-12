这里禁止更新的操作方法就通过修改更新软件的名称，使其无法再生效。

> sudo mv "/Library/Application Support/Microsoft/MAU2.0/Microsoft AutoUpdate.app"   "/Library/Application Support/Microsoft/MAU2.0/Microsoft AutoUpdate.disable.app"



恢复软件更新（就是把名字再改回原来的）

> [!IMPORTANT]
>
> sudo mv "/Library/Application Support/Microsoft/MAU2.0/Microsoft AutoUpdate.disable.app"   "/Library/Application Support/Microsoft/MAU2.0/Microsoft AutoUpdate.app"

