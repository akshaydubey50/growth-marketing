"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchPromptResourceList } from "@/redux/slice/prompt-resource/promptResource.slice";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Card } from "@/components/ui/card";
import Loading from "@/app/loading";
import { PropmtResourceModel } from "@/models/airtable.model";

import PromptHeader from "@/components/prompt/PromptHeader";
import PromptContent from "@/components/prompt/PromptContent";
import SimilarPrompts from "@/components/prompt/SimilarPrompts";

interface PromptDetailPageProps {
  params: {
    slug: string;
  };
}

export default function PromptDetailPage({
  params: { slug },
}: PromptDetailPageProps) {
  const { promptResourceList, isLoading, isError } = useSelector(
    (state: RootState) => state.promptResources
  );
  const dispatch: AppDispatch = useDispatch();

  const typedPromptResourceList = useMemo(
    () => promptResourceList as PropmtResourceModel[],
    [promptResourceList]
  );

  const promptData = useMemo(
    () =>
      typedPromptResourceList.find((prompt) => {
        const formattedTitle = prompt.fields.Name?.toLowerCase()
          ?.trim()
          ?.replace(/\s/g, "-");
        return formattedTitle === slug;
      }),
    [typedPromptResourceList, slug]
  );

  const [similarPrompts, setSimilarPrompts] = useState<PropmtResourceModel[]>(
    []
  );

  useEffect(() => {
    if (typedPromptResourceList.length === 0) {
      dispatch(fetchPromptResourceList());
    }
  }, [dispatch, typedPromptResourceList.length]);

  useEffect(() => {
    if (promptData && typedPromptResourceList.length > 0) {
      const filteredPrompts = typedPromptResourceList
        .filter(
          (prompt) =>
            prompt.fields.Category?.[0] === promptData.fields.Category?.[0] &&
            prompt.fields.Name !== promptData.fields.Name
        )
        .slice(0, 6);
      setSimilarPrompts(filteredPrompts);
    }
  }, [promptData, typedPromptResourceList]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading prompts. Please try again later.</div>;
  }

  if (!promptData) {
    return <div>Prompts not found</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <nav className="flex items-center mb-6 space-x-2 text-sm text-gray-500">
        <Breadcrumb categories="prompts" currentPageTitle={slug} key={slug} />
      </nav>

      <Card className="mb-6 border border-black bg-light-gray">
        <PromptHeader promptData={promptData} />
        <PromptContent promptData={promptData} />
      </Card>

      <SimilarPrompts
        category={promptData.fields.Category?.[0]}
        similarPrompts={similarPrompts}
      />
    </div>
  );
}
