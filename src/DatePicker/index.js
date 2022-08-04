// 定义每个月的天数，闰月的话就是29天
const getDaysMonth = (year = 2022) => {
	const daysMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
		daysMonth[1] = 29;
	}
	return daysMonth;
};
// 获得月份的第一天是星期几
const getStartDay = (year, month) => {
	return new Date(year, month - 1, 1).getDay();
};
const splitArr = (arr, num = 7) => {
	return arr.reduce(
		(prev, cur) => {
			const len = prev.length;
			if (prev[len - 1].length < num) {
				prev[len - 1].push(cur);
			} else {
				prev[len] = [cur];
			}
			return prev;
		},
		[[]]
	);
};
// 顶部星期
const createTheadHtml = () => {
	const thead = document.querySelector('thead');
	const theadList = ['日', '一', '二', '三', '四', '五', '六'];

	let html = theadList
		.map(item => {
			return `<th>${item}</th>`;
		})
		.join('');
	html = `<tr>
  ${html}
  </tr>`;
	thead.innerHTML = html;
};
// 日期
const createTbodyHtml = () => {
	const tbody = document.querySelector('tbody');
	let html = '';
	const totalArr = [];
	const prev = getLastMonth(2022, 8);
	totalArr.push(...prev);
	for (let i = 1; i <= 31; i++) {
		totalArr.push({
			type: 'normal',
			content: i
		});
	}
	const list = splitArr(totalArr);
	list.forEach(item => {
		html += `<tr>${item
			.map(item => {
				return `<td>${item.content}</td>`;
			})
			.join('')}</tr>`;
	});
	tbody.innerHTML = html;
};
// 计算上月的日期需要渲染的部分
const getLastMonth = (year, month) => {
	const preNum = getStartDay(year, month);
	const prevArr = [];
	for (let i = 0; i < preNum; i++) {
		const obj = {
			type: 'prev',
			content: ''
		};
		prevArr.push(obj);
	}
	return prevArr;
};
const render = () => {
	createTheadHtml();
	createTbodyHtml();
};

render();
