### mysql数据库
* 创建表
    - 数据类型
        + 整数类型 int
        + 浮点类型 double
        + 日期类型 date/timestamp
        + 字符串类型 char varchar
            * 可变varchar 不可变是char
            * 空间换时间
    - 首先足够用，其次尽量小
```
    create table 表名(
        id int,
        name varchar(20)
    );
```

    - 查看创建表的语句
        + show create table 表名
    - 查看表的明细
        + desc 表名
* 删除表
    - drop table 表名
* 插入数据
    - 第一种：全表字段插入
        + `insert into 表名 values (val1,val2...)`
        + 插入的字段类型和*顺序必须*与表的字段*类型*与顺序保持一致,个数是针对全表字段的插入
    - 指定表字段的插入
        + `insert into 表名 (字段1,字段2...) values (val1,val2...)`
        + 插入的数据的顺序要与声明的字段名的顺序一致
        + 类型也要一致，个数也要一致
* 总结
* 1: 登录：
    - mysql -uroot -p
    - 密码
* 2: 查看有哪些数据库
    - show databases;
* 3: 切换数据库
    - use 数据库名;
* 4: show tables;
* 5: 查看表字段明细
    - desc 表名;
* 6: 插入数据
    - `insert into 表名 (字段1,..) values (值1...)`

* 更新操作
    - `UPDATE 表名 SET 字段1 = 表达式,[,字段2 = 表达式] [WHERE express布尔值]`
    - ` update student set tmp = 20+1,sex = sex where 1=1;`
* 删除操作
    - `DELETE FROM 表名 [,WHERE exr布尔值]`
    - `delete from student where name = '马蓉';`
* truncate和delete的区别
    - `truncate table 表名`
    delete会一条一条的删 自增id保留
    truncate先摧毁整张表，再创建一张和原来的表结构一模一样的表
    truncate在效率上比delete高
    truncate只能删除整表的数据，也就是格式化。
    truncate会把自增id截断恢复为1

### 查询语句
* DISTINCT 去重，尽量不要根据* 来去重
    - `select distinct name,age from student;`
* 查询语句可以指定多个字段查询，也可以使用* 查询
    - 在企业中，使用SQL查询* 是会拉低查询效率的 ，建议少用* 查询 
#### 条件查询
* `select * from student where math > 66.6 or math < 66.6;`

```
> < <= >= = <>    大于、小于、大于(小于等于)、不等于
BETWEEN…AND 显示在某一区间的值
IN(set) 显示在in列表中的值，例：in(100,200)
LIKE ‘张pattern’ 模糊查询%
IS NULL 判断是否为空
AND 多个条件同时成立
OR  多个条件任一成立
NOT 不成立，例：WHERE NOT(salary>100)
```

* 模糊查询
    - 包含关`select * from student where name like '%关%';` 
    - 以关开头`select * from student where name like '关%';` 
    - 以关结尾`select * from student where name like '%关';` 
* 判断为空
    - `select * from student where sex is not null;`

#### 聚合函数
* 统计数量 
    - count(星号)
* 求和
    - sum(math+english+chinese)
* 平均值
    - avg(math+english+chinese)
* 找最值
    - max(列)/min(列)/max(math+english+chinese)

#### 排序(order by)
* `select * from student where 1= 1 order by chinese desc,math desc,english desc;`

#### 分组(group by)
* 如果聚合函数只有一行，需要对于不同的集合做聚合运算就加上分组
    - `select zu,count(*) from student group by zu;`

#### 分页(limit)
```
    - `select * from student limit 10,5;`
    - limit offset(起始位置) count(显示多少个)
    - limit 使用的时候，offset从0开始
    - 豆瓣： offset （当前页-1）* 页显示数
        + count ： 页显示数
```

#### 默认端口
* oracle：1521
* sqlserver ：1433
* mysql ：3306
* mongodb ：27017
* DB2 ： 50000

#### mongoDB
* 关系是数据库对应多个集合
    - 集合对应多个文档对象
    - 在mongo中不论是db还是集合，你都无需去创建他
    - 直接就当他已经存在，直接Use来使用
        + use db名称;
            * 接着会被切换到该db中
            * `db.要创建的集合名称.save({})`;这样集合就被创建了
* 1:启动服务器
    - `mongod --dbpath "D:/mongodb/db"` // 目录一定要存在自己创建随便名称‘
        + 尽量设置在非系统盘 `C盘生成目录是需要权限的`
    - 如果看到`waiting for connections on port 27017`说明服务已经启动
* 客户端连接服务器**另开一个命令行**
    - `mongo` 默认连接的是test数据库
* 查询有哪些数据库  
    - 查询数据库：`show dbs;`
    - 切换数据库: `use 数据库名;`
* 查询当前db下有哪些集合
    - `show collections;`
* 查询数据：
    - `db.集合名.find();`  //查询出来的是文档对象 document
    - `db.users.find();`
* 添加数据:
    - `db.集合名.save(对象)` //mongo默认会给我们加入_id作为该文档对象的唯一标识
    - `db.users.save({contry:'中国',name:'小明',score:77});`
* 删除数据:
    - `db.集合名.remove(条件对象);`//条件匹配就会被删除
    - `db.users.remove({name:'小明'});`
    - 如果给定一个空对像，会匹配全部
* 更新数据:
    - `db.集合名.update({匹配条件对象},{$set:{修改后的对象}});`
    - `db.users.update({name:'小明'},{$set:{contry:'印度'}});;`

#### 条件查询

```
练习：
   查询姓名为小明的学生
        db.users.find({name:'小明'});;
   查询英语成绩大于90分的同学
        db.users.find({score:{$gt:90}}); //查找成绩大于90分$gt
        //$lt小于
   查询数学成绩不等于88的同学
        db.users.find({score:{$ne:88}});
   查询总分大于200分的所有同学
        db.users.find({score:{$gt:200}});
```


#### 分页
* `db.users.find().skip(3).limit(3);`
* db.集合名称.find().跳到3.显示3条
                    + limit 0,3
    
#### 排序
* `db.users.find().sort({key:排序方式});`
* `db.users.find().sort({'score':1});` //正数代表升序，负数代表降序
#### 模糊匹配
* `db.users.find({name:{$regex:'小'}});`
* `db.users.find({name:{$regex:'明'}});`

#### 聚合函数
* 需要求当前集合的记录数：
* `db.users.find().count();`
* 求最大值
    -求整个集合的总成绩
        + db.集合名.聚合({ 组的划分规则{_id:'1',显示内容:{$sum:'$score'}} })
    - 求所有人的平均分
        + `db.users.aggregate({$group:{_id:'1',sumscore:{$avg:'$score' } }});`
    - 求按国家分组，求所有国家的总分
        + `db.users.aggregate({$group:{_id:'$contry',sumScore:{$sum:'$score'}}});`

* 添加基础数据:
    db.users.save({contry:'中国',name:'小明',score:77});
    db.users.save({contry:'中国',name:'小红',score:88});
    db.users.save({contry:'中国',name:'小张',score:99});
    db.users.save({contry:'美国',name:'jack',score:45});
    db.users.save({contry:'美国',name:'rose',score:67});
    db.users.save({contry:'美国',name:'mick',score:89});

解决32位异常
mongod --dbpath="路径" --journal --storageEngine=mmapv1