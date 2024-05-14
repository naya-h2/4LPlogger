import RecordCard from "components/RecordCard";
import { MONTH } from "constants/mockup";
import styled from "styled-components";
import cloverIcon from "assets/icon/logo-run.svg";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import arrowLeft from "assets/icon/arrow-left_md.svg";
import arrowRight from "assets/icon/arrow-right_md.svg";
import "styles/customCalendar.css";

function CalendarPage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<any>(today);
  const [month, setMonth] = useState(format(today, "yyyy-MM"));

  // useEffect(() => {
  //   refetch();
  // }, [month]);

  // useEffect(() => {
  //   setDataList(data?.filter((item) => item.deadline === format(selectedDate, 'yyyy-MM-dd')));
  // }, [selectedDate]);

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const handleNextMonthClick = () => {
    const [yyyy, mm] = month.split("-");
    if (mm === "12") return setMonth(Number(yyyy) + 1 + "-" + "01");
    const newMonth = Number(mm) + 1;
    setMonth(format(yyyy + "-" + newMonth, "yyyy-MM"));
  };

  const handlePrevMonthClick = () => {
    const [yyyy, mm] = month.split("-");
    if (mm === "01") return setMonth(Number(yyyy) - 1 + "-" + "12");
    const newMonth = Number(mm) - 1;
    setMonth(format(yyyy + "-" + newMonth, "yyyy-MM"));
  };

  return (
    <>
      <Title>플로깅 기록을 모아보세요</Title>
      <Clover>
        <Icon src={cloverIcon} />: 111
      </Clover>
      <Calendar
        value={selectedDate}
        onChange={(date) => {
          console.log(date);
          setSelectedDate(date);
        }}
        onClickMonth={(date) => setMonth(format(date, "yyyy-MM"))}
        prevLabel={<ArrowButton src={arrowLeft} onClick={handlePrevMonthClick} />}
        nextLabel={<ArrowButton src={arrowRight} onClick={handleNextMonthClick} />}
        formatDay={(locale, date) => format(date, "dd")}
        formatYear={(locale, date) => format(date, "yyyy")}
        formatMonthYear={(locale, date) => format(date, "MM월")}
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        tileContent={({ date, view }) => {
          const curDate = format(date, "yyyy-MM-dd");
          for (const data of MONTH) {
            if (data.date === curDate) return <ImgTile src={data.imgSrc} />;
          }
          return null;
        }}
      />
      <CardWrapper>{MONTH.map((data) => (data.date === format(selectedDate, "yyyy-MM-dd") ? <RecordCard key={data.id} data={data} /> : null))}</CardWrapper>
    </>
  );
}

export default CalendarPage;

const Title = styled.div`
  padding: 16px 0;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

const Clover = styled.div`
  height: 20px;

  color: #4e4e4e;
  font-size: 18px;
  font-weight: 700;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const ArrowButton = styled.img`
  width: 32px;
  height: 32px;

  object-position: center;
  object-fit: cover;
`;

const ImgTile = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
