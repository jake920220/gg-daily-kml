const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const targetUrl = 'https://kml.or.kr/stat98/record_list.php?year=2023&month=9'; // 크롤링할 웹사이트 주소
axios.get(targetUrl)
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);

            // 특정 테이블을 선택 (여기서는 첫 번째 테이블을 선택)
            const table = $('table')[0];

            // 테이블의 tbody 선택
            const tbody = $(table).find('tbody');

            // tbody 내의 각 행 (tr)을 선택
            const rows = tbody.find('tr');

            const EntireData = [];

            // 각 행을 순회하면서 데이터를 읽어옴
            rows.each((index, element) => {
                const columns = $(element).find('td'); // 각 행의 열 (td) 선택
                const obj = {};

                // 각 열의 데이터를 rowData 배열에 추가
                columns.each((colIndex, colElement) => {
                    const text = $(colElement).text().trim();
                    if(colIndex === 0) {
                        obj['id'] = text;
                    } else if (colIndex === 1) {
                        obj['date'] = text;
                    } else if (colIndex === 2) {
                        obj['type'] = text;
                    } else if (colIndex === 3) {
                        obj['first'] = text;
                    } else if (colIndex === 4) {
                        obj['second'] = text;
                    } else if (colIndex === 5) {
                        obj['third'] = text;
                    } else if (colIndex === 6) {
                        obj['last'] = text;
                    }
                });

                EntireData.push(obj);
                // rowData 배열에 있는 데이터 출력 또는 원하는 작업 수행
                // console.log(rowData);
            });

            console.log("HI", EntireData);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });


const
