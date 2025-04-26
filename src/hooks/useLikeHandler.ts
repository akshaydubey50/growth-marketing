// useLikeHandler.ts
import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";
import {
  addLike,
  deleteLike,
  getLikeList,
} from "@/redux/slice/like/like.slice";
import { useDispatch, useSelector } from "react-redux";

export function useLikeHandler(
  id: string,
  Name: string,
  isInitialLiked: boolean,
  itemType: "tools" | "prompts"
) {
  console.log({id, Name, isInitialLiked, itemType})
  const [isLiked, setIsLiked] = useState(isInitialLiked);
  const [localTotalLikes, setLocalTotalLikes] = useState(0);
  const { toast } = useToast();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const likedList = useSelector((state: RootState) => state.likes.likedList);

  useEffect(() => {
    setIsLiked(isInitialLiked);
  }, [isInitialLiked]);

  useEffect(() => {
    const item = likedList
      ?.find((like) => like.itemType === itemType)
      ?.itemIds.find((item) => item.itemId === id);

    if (item) {
      setLocalTotalLikes(item.likeCount);
    }
  }, [likedList, id, itemType]);

  const handleLike = useCallback(async () => {
    if (!session || !session?.user) {
      toast({
        title: "Please log in to like",
        variant: "destructive",
      });
      return;
    }

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLocalTotalLikes(prev => newLikedState ? prev + 1 : prev - 1);

    try {
      if (newLikedState) {
        await dispatch(addLike({ itemId: id, itemType }));
        toast({
          title: `You liked ${Name}`,
          variant: "success",
        });
      } else {
        await dispatch(deleteLike({ itemId: id, itemType }));
        toast({
          title: `You removed ${Name} from likes`,
          variant: "destructive",
        });
      }
      await dispatch(getLikeList());
    } catch (error) {
      console.error("Error liking/unliking the item:", error);
      setIsLiked(isLiked);
      setLocalTotalLikes(prev => isLiked ? prev - 1 : prev + 1);
    }
  }, [session, toast, Name, dispatch, id, itemType, isLiked]);

  return { isLiked, handleLike, totalLikes: localTotalLikes };
}
