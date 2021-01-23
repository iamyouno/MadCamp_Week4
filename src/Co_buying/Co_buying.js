import React from 'react';
import './Co_table_td1.css';
import './Co_table_td2.css';
import './Co_buying.css';

function Co_buying(params) {
    return(
        <div>
            <table className="Co_buying">
                <thead>
                    <tr>
                        <th>물품</th>
                        <th>인원</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="Co_table_td1">자전거</td>
                        <td className="Co_table_td2">3</td>
                        <td className="Co_table_td2">1</td>
                        <td className="Co_table_td2">2021.01.23</td>
                    </tr>
                    <tr>
                        <td className="Co_table_td1">쿠팡</td>
                        <td className="Co_table_td2">2</td>
                        <td className="Co_table_td2">1</td>
                        <td className="Co_table_td2">2021.01.20</td>
                    </tr>
                    <tr>
                        <td className="Co_table_td1">쿠팡쿠팡쿠팡쿠팡쿠팡쿠팡쿠팡</td>
                        <td className="Co_table_td2">22</td>
                        <td className="Co_table_td2">11</td>
                        <td className="Co_table_td2">2021.01.20</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Co_buying