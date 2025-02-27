# [579. 查询员工的累计薪水](https://leetcode.cn/problems/find-cumulative-salary-of-an-employee)

[English Version](/solution/0500-0599/0579.Find%20Cumulative%20Salary%20of%20an%20Employee/README_EN.md)

## 题目描述

<!-- 这里写题目描述 -->

<p><strong>Employee</strong> 表保存了一年内的薪水信息。</p>

<p>请你编写 SQL 语句，对于每个员工，查询他除最近一个月（即最大月）之外，剩下每个月的近三个月的累计薪水（不足三个月也要计算）。</p>

<p>结果请按 <code>Id</code> 升序，然后按 <code>Month</code> 降序显示。</p>

<p> </p>

<p><strong>示例：</strong><br />
<strong>输入：</strong></p>

<pre>
| Id | Month | Salary |
|----|-------|--------|
| 1  | 1     | 20     |
| 2  | 1     | 20     |
| 1  | 2     | 30     |
| 2  | 2     | 30     |
| 3  | 2     | 40     |
| 1  | 3     | 40     |
| 3  | 3     | 60     |
| 1  | 4     | 60     |
| 3  | 4     | 70     |
</pre>

<p><strong>输出：</strong></p>

<pre>
| Id | Month | Salary |
|----|-------|--------|
| 1  | 3     | 90     |
| 1  | 2     | 50     |
| 1  | 1     | 20     |
| 2  | 1     | 20     |
| 3  | 3     | 100    |
| 3  | 2     | 40     |
</pre>

<p> </p>

<p><strong>解释：</strong></p>

<p>员工 '1' 除去最近一个月（月份 '4'），有三个月的薪水记录：月份 '3' 薪水为 40，月份 '2' 薪水为 30，月份 '1' 薪水为 20。</p>

<p>所以近 3 个月的薪水累计分别为 (40 + 30 + 20) = 90，(30 + 20) = 50 和 20。</p>

<pre>
| Id | Month | Salary |
|----|-------|--------|
| 1  | 3     | 90     |
| 1  | 2     | 50     |
| 1  | 1     | 20     |
</pre>

<p>员工 '2' 除去最近的一个月（月份 '2'）的话，只有月份 '1' 这一个月的薪水记录。</p>

<pre>
| Id | Month | Salary |
|----|-------|--------|
| 2  | 1     | 20     |
</pre>

<p>员工 '3' 除去最近一个月（月份 '4'）后有两个月，分别为：月份 '3' 薪水为 60 和 月份 '2' 薪水为 40。所以各月的累计情况如下：</p>

<pre>
| Id | Month | Salary |
|----|-------|--------|
| 3  | 3     | 100    |
| 3  | 2     | 40     |
</pre>

<p> </p>

## 解法

<!-- 这里可写通用的实现逻辑 -->

<!-- tabs:start -->

### **SQL**

```sql
# Write your MySQL query statement below
SELECT
    id,
    month,
    sum(salary) OVER (
        PARTITION BY id
        ORDER BY month
        RANGE 2 PRECEDING
    ) AS Salary
FROM employee
WHERE
    (id, month) NOT IN (
        SELECT
            id,
            max(month)
        FROM Employee
        GROUP BY id
    )
ORDER BY id, month DESC;
```

<!-- tabs:end -->
