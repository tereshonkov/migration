"use client";

import FeedbackIcon from "@mui/icons-material/Feedback";
import BarChartIcon from "@mui/icons-material/BarChart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import {
  Badge,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useTabContext } from "@/context/TabContext";
import { getMessages } from "@/entities/admin/api/messages";
import type { MessagesTypes } from "@/entities/admin/model/type";
import type { ReviewsTypes } from "@/entities/services/model/review";
import { useEffect, useState } from "react";
import { getReviews } from "@/entities/admin/api/reviews";

export default function Sidebar() {
  const { setPage } = useTabContext();
  const [messages, setMessages] = useState<MessagesTypes[]>([]);
  const [reviews, setReviews] = useState<ReviewsTypes[]>([]);
  useEffect(() => {
    getMessages().then((data) => setMessages(data));
    getReviews().then((data) => setReviews(data));
  }, []);
  return (
    <>
      <Box
        width={280}
        p={3}
        sx={{
          background:
            "linear-gradient(155deg, rgba(255, 244, 232, 0.97), rgba(247, 210, 173, 0.9))",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(56, 29, 12, 0.12)",
          height: "fit-content",
        }}
      >
        <ListItemButton
          onClick={() => {
            setPage((prev) => ({
              ...prev,
              analitycs: true,
              messages: false,
              reviews: false,
              products: false,
              users: false,
            }));
          }}
          sx={{
            borderRadius: 2,
            mb: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(112, 64, 21, 0.1)",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "primary.main", minWidth: 40 }}>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText
            primary="Аналитика"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "15px",
                fontWeight: 500,
              },
            }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={() =>
            setPage((prev) => ({
              ...prev,
              analitycs: false,
              messages: true,
              reviews: false,
              products: false,
              users: false,
            }))
          }
          sx={{
            borderRadius: 2,
            mb: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(112, 64, 21, 0.1)",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "primary.main", minWidth: 40 }}>
            <Badge badgeContent={messages?.length || 0} color="secondary">
              <MailIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText
            primary="Сообщения"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "15px",
                fontWeight: 500,
              },
            }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={() =>
            setPage((prev) => ({
              ...prev,
              analitycs: false,
              messages: false,
              reviews: true,
              products: false,
              users: false,
            }))
          }
          sx={{
            borderRadius: 2,
            mb: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(112, 64, 21, 0.1)",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "primary.main", minWidth: 40 }}>
            <Badge badgeContent={reviews?.length || 0} color="secondary">
              <FeedbackIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText
            primary="Отзывы"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "15px",
                fontWeight: 500,
              },
            }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            setPage((prev) => ({
              ...prev,
              analitycs: false,
              messages: false,
              reviews: false,
              products: true,
              users: false,
            }));
          }}
          sx={{
            borderRadius: 2,
            mb: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(112, 64, 21, 0.1)",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "primary.main", minWidth: 40 }}>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText
            primary="Все товары"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "15px",
                fontWeight: 500,
              },
            }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            setPage((prev) => ({
              ...prev,
              analitycs: false,
              messages: false,
              reviews: false,
              products: false,
              users: true,
            }));
          }}
          sx={{
            borderRadius: 2,
            mb: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(112, 64, 21, 0.1)",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "primary.main", minWidth: 40 }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Пользователи"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "15px",
                fontWeight: 500,
              },
            }}
          />
        </ListItemButton>
      </Box>
    </>
  );
}
