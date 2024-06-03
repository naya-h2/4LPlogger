import RecordCard from "components/RecordCard";
import styled from "styled-components";
import cloverIcon from "assets/icon/logo-run.svg";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import arrowLeft from "assets/icon/arrow-left_md.svg";
import arrowRight from "assets/icon/arrow-right_md.svg";
import "styles/customCalendar.css";
import { useQuery } from "react-query";
import api from "api/axios";
import { useCheckLogin } from "hooks/useCheckLogin";
import { Helmet } from "react-helmet-async";

function CalendarPage() {
  useCheckLogin();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<any>(today);
  const [month, setMonth] = useState(format(today, "yyyy-MM"));
  const [clover, setClover] = useState(0);
  const [todayData, setTodayData] = useState<any>([]);

  const { data, refetch, isSuccess } = useQuery({
    queryKey: ["month", month],
    queryFn: async () => {
      const res = await api.post("/monthly", { date: `${month}-01` });
      let arr = [] as any[];
      res.data.map((plogging: any) => (plogging.date === format(selectedDate, "yyyy-MM-dd") ? arr.push(plogging) : null));
      setTodayData(arr);
      return res.data;
    },
  });

  const getCloverNumber = async () => {
    const res = await api.get("/api/members/rank");
    setClover(res.data.clovers);
  };

  useEffect(() => {
    getCloverNumber();
  }, []);

  useEffect(() => {
    refetch();
  }, [month]);

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

  console.log(data);

  useEffect(() => {
    if (data?.length > 0) {
      data.map((plogging: any) => (plogging.date === format(selectedDate, "yyyy-MM-dd") ? setTodayData((prev: any) => [...prev, plogging]) : null));
    }
  }, [selectedDate]);

  return (
    <>
      <Helmet>
        <title>모아보기 | 네잎플로거</title>
      </Helmet>
      <Container>
        <Title>플로깅 기록을 모아보세요</Title>
        <Clover>
          <Icon src={cloverIcon} />
          {`: ${clover}`}
        </Clover>
        <Calendar
          value={selectedDate}
          onChange={(date) => {
            setTodayData([]);
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
            if (!data) return null;
            let tile = null;
            for (const plogging of data) {
              if (plogging.date === curDate && plogging.imageURL) tile = <ImgTile src={plogging.imageURL || cloverIcon} />;
            }
            return tile;
          }}
        />
        <Guide>가장 마지막 기록의 인증 사진이 썸네일이 됩니다.</Guide>
        {isSuccess && (
          <CardWrapper>
            {todayData?.length === 0
              ? "기록 데이터가 없습니다."
              : todayData.map((plogging: any) => (plogging.date === format(selectedDate, "yyyy-MM-dd") ? <RecordCard key={plogging.imageURL} data={plogging} /> : null))}
          </CardWrapper>
        )}
      </Container>
    </>
  );
}

export default CalendarPage;

const Container = styled.div`
  padding: 16px;
`;

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
  align-items: center;
  gap: 8px;
`;

const Guide = styled.p`
  font-size: 12px;
  color: #c4c4c4;
  margin-bottom: 12px;
`;
