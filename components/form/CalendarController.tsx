import dayjs from "dayjs";
import { useMemo } from "react";
import { Calendar, CalendarProps, DateData } from "react-native-calendars";

type Props = Omit<CalendarProps, "markedDates"> & {
    selectedDate?: Date;
    onDayPress: (day: any) => void;
};

export function SingleCalendarController({ theme, selectedDate, onDayPress, ...props }: Props) {
    const markedDates = useMemo(() => {
        if (!selectedDate) return {};
        const date = dayjs(selectedDate).format("YYYY-MM-DD");
        return {
            [date]: { selected: true, selectedColor: "white" },
        };
    }, [selectedDate]);

    return (
        <Calendar
            // TODO: handle theme later
            markedDates={markedDates}
            onDayPress={(day: DateData) => {
                onDayPress(new Date(day.timestamp));
            }}
            theme={{
                monthTextColor: "white",
                calendarBackground: "black",
                dayTextColor: "white",
                textDisabledColor: "gray",
                selectedDayTextColor: "black",
                ...theme,
            }}
            {...props}
        />
    );
}
