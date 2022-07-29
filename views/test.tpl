<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="button" id="button">提交</div>
    <script>
        const PAGE={
            init: function(){
                this.bind();
            },
            bind: function(){
                let button=document.getElementById('button');
                button.addEventListener('click',this.handlerInsert);
            },
            handlerInsert: async function(event){
                let InsertFetch=await fetch('http://localhost:3000/api/comment/62e332e9588b7e15d0113641',{
                    method: 'delete',
                    body: JSON.stringify({
                        // name: "小红",
                        // targetName: "小白",
                        // content: "谢谢夸奖",
                        // article_id: "62e29672db7301205c8afbe7"
                    }),
                    headers:{
                        'content-type': 'application/json'
                    },
                }).then(response => response.json())
                if(InsertFetch.code===200){
                    alert("添加成功！");
                    console.log(InsertFetch.data)
                }else{
                    alert("添加失败！");
                    console.log(InsertFetch.data,InsertFetch.message)
                }
            }
        };
        PAGE.init();
    </script>
</body>
</html>