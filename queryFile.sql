-- TABLE CREATION QUERIES
create table department(
    dept_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    emp_count INT default 0,
	UNIQUE(name)
);

ALTER TABLE department ALTER COLUMN emp_count SET DEFAULT 0;
ALTER TABLE department ADD CONSTRAINT dept_unique UNIQUE (name);

create table address(
    addr_id SERIAL NOT NULL PRIMARY KEY,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    pincode VARCHAR(15) NOT NULL,
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50) NOT NULL
);

create table employee(
    emp_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    joining_date DATE NOT NULL,
    dept_id INT REFERENCES department(dept_id),
    addr_id INT REFERENCES address(addr_id)
);

-- SELECT ALL QUERIES

select * from department;
select * from employee;
select * from address;
select row_to_json(department) from department;
select array_to_json(array_agg(row_to_json(department))) from department;

-- FIXED DATA INSERT QUERIES

insert into department(name) VALUES('accounts');
insert into department(name) VALUES('human resources');
insert into department(name) VALUES('technology');
insert into department(name) VALUES('sales');
insert into department(name) VALUES('marketing');

insert into address(address1, address2, pincode, city, state, country) 
	VALUES('skdfjb', 'sdjfbsdf', '24234', 'mumbai', 'mah', 'india');


-- SAMPLE DATA INSERT QUERIES
insert into employee(name, age, joining_date, dept_id) VALUES('test', 21, '2022-01-21', 1);
insert into employee(name, age, joining_date, dept_id) VALUES('mark', 24, '2022-02-21', 2);

-- TRIGGER FUNCTION
create or replace function count_emp_per_dept()
returns trigger
as $func$
begin
    update department set emp_count = emp_count + 1 where dept_id = new.dept_id;	
	return null;
end;
$func$ language plpgsql;

create trigger cal_emp_count_insert
after insert
on employee
for each row
execute procedure count_emp_per_dept();

-- REGULAR FUNCTION
create or replace function filtered_emp_details(from_date date, dept int)
returns json language plpgsql as
$$
begin
return(select array_to_json(array_agg(row_to_json(employee))) 
	   from employee where employee.dept_id = dept and  joining_date >= from_date);
end
$$;

DROP FUNCTION filtered_emp_details(date,integer);

select filtered_emp_details(to_date('2022-01-01','YYYY-MM-DD'), 2);

-- TEST

select array_to_json(array_agg(row_to_json(employee))) 
	from employee where joining_date >= '2022-01-01' and dept_id = 1;

select array_to_json(array_agg(row_to_json(department))) from department where dept_id=1;

select * from employee left join address on address.addr_id = employee.addr_id where emp_id=2;

