<?php 
$uname = $_POST["uname"];
$upwd   = $_POST["upwd"];
if(!$uname || !$upwd){
    die("用户名密码不能为空！");
}
$SQL = new mysqli("10.9.155.100","root","","cs1");
if(!$SQL){
    die("数据库连接失败！");
}
	//4,编写sql语句
	$sql = "INSERT INTO `xinxi`( `name`, `pwd`) VALUES ('$uname','$upwd')";
	//5,执行sql语句
	$row =mysql_query($sql);
	if($row){
		echo "<script>alert('注册成功');location.href='login.html';</script>";
	}else{
		echo "<script>alert('注册成功');</script>";
	}
?>
