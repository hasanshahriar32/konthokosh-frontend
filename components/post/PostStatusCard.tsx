'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/common/Icons'
import { type OriginalityReport, type PostStatus } from '@/types/post'

type PostStatusCardProps = {
	status: PostStatus
	originalityReport?: OriginalityReport
	onRetry?: () => void
	onViewReport?: () => void
	className?: string
}

const STATUS_CONFIG = {
	draft: {
		icon: 'Edit',
		label: 'Draft',
		description: 'This post is saved as a draft',
		color: 'bg-muted text-muted-foreground',
		borderColor: 'border-muted'
	},
	analyzing: {
		icon: 'Brain',
		label: 'Analyzing',
		description: 'AI is analyzing your content for originality...',
		color: 'bg-primary/10 text-primary',
		borderColor: 'border-primary/30'
	},
	verified: {
		icon: 'Check',
		label: 'Verified',
		description: 'Your content has been verified as original',
		color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
		borderColor: 'border-green-300 dark:border-green-700'
	},
	published: {
		icon: 'Globe',
		label: 'Published',
		description: 'Your post is live and publicly available',
		color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
		borderColor: 'border-blue-300 dark:border-blue-700'
	},
	rejected: {
		icon: 'X',
		label: 'Rejected',
		description: 'Content analysis detected potential issues',
		color: 'bg-destructive/10 text-destructive',
		borderColor: 'border-destructive/30'
	}
} as const

/**
 * 🔍 Post status card showing originality analysis results
 *
 * @param status - Current post status
 * @param originalityReport - AI analysis results
 * @param onRetry - Callback to retry analysis
 * @param onViewReport - Callback to view detailed report
 * @param className - Additional CSS classes
 */
const PostStatusCard = ({
	status,
	originalityReport,
	onRetry,
	onViewReport,
	className
}: PostStatusCardProps) => {
	const config = STATUS_CONFIG[status]
	const IconComponent = Icons[config.icon as keyof typeof Icons]

	const getScoreColor = (score: number) => {
		if (score >= 90) return 'text-green-600 dark:text-green-400'
		if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
		return 'text-red-600 dark:text-red-400'
	}

	const getScoreBadgeVariant = (score: number) => {
		if (score >= 90) return 'default'
		if (score >= 70) return 'secondary'
		return 'destructive'
	}

	return (
		<Card className={`${config.borderColor} border-l-4 hover:shadow-lg transition-all duration-300 glow-on-hover ${className}`}>
			<CardHeader className="pb-4">
				<CardTitle className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color}`}>
							{status === 'analyzing' ? (
								<div className="animate-heartbeat">
									<IconComponent className="h-5 w-5" />
								</div>
							) : (
								<IconComponent className="h-5 w-5" />
							)}
						</div>
						<div>
							<h3 className="font-semibold">{config.label}</h3>
							<p className="text-sm text-muted-foreground">{config.description}</p>
						</div>
					</div>

					{originalityReport && (
						<Badge
							variant={getScoreBadgeVariant(originalityReport.score)}
							className="text-sm font-bold"
						>
							{originalityReport.score}% Original
						</Badge>
					)}
				</CardTitle>
			</CardHeader>

			{originalityReport && (
				<CardContent className="space-y-4">
					{/* Originality Score */}
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">Originality Score</span>
							<span className={`text-sm font-bold ${getScoreColor(originalityReport.score)}`}>
								{originalityReport.score}%
							</span>
						</div>
						<div className="w-full bg-muted rounded-full h-2">
							<div
								className={`h-2 rounded-full transition-all duration-500 ${
									originalityReport.score >= 90
										? 'bg-green-500'
										: originalityReport.score >= 70
										? 'bg-yellow-500'
										: 'bg-red-500'
								}`}
								style={{ width: `${originalityReport.score}%` }}
							/>
						</div>
					</div>

					{/* Analysis Details */}
					{originalityReport.analysisDetails && (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="text-center p-3 rounded-lg bg-muted/30">
								<div className="text-lg font-bold text-primary">
									{originalityReport.analysisDetails.uniqueContent}%
								</div>
								<div className="text-xs text-muted-foreground">Unique Content</div>
							</div>
							<div className="text-center p-3 rounded-lg bg-muted/30">
								<div className="text-lg font-bold text-secondary">
									{originalityReport.analysisDetails.plagiarismPercentage}%
								</div>
								<div className="text-xs text-muted-foreground">Similarity Found</div>
							</div>
							<div className="text-center p-3 rounded-lg bg-muted/30">
								<div className="text-lg font-bold text-accent">
									{originalityReport.analysisDetails.sourcesFound}
								</div>
								<div className="text-xs text-muted-foreground">Sources Checked</div>
							</div>
						</div>
					)}

					{/* Similar Posts */}
					{originalityReport.similarPosts.length > 0 && (
						<div className="space-y-2">
							<h4 className="text-sm font-medium flex items-center gap-2">
								<Icons.Search className="h-4 w-4" />
								Similar Content Found ({originalityReport.similarPosts.length})
							</h4>
							<div className="space-y-2 max-h-32 overflow-y-auto">
								{originalityReport.similarPosts.slice(0, 3).map((post, index) => (
									<div
										key={post.id || index}
										className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-sm"
									>
										<div className="flex-1 min-w-0">
											<div className="font-medium truncate">{post.title}</div>
											<div className="text-muted-foreground text-xs">by {post.author}</div>
										</div>
										<Badge variant="outline" className="ml-2">
											{post.similarity}% similar
										</Badge>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex gap-2 pt-2">
						{onViewReport && (
							<Button
								variant="outline"
								size="sm"
								onClick={onViewReport}
								className="flex-1"
							>
								<Icons.Eye className="mr-2 h-4 w-4" />
								View Full Report
							</Button>
						)}

						{status === 'rejected' && onRetry && (
							<Button
								variant="outline"
								size="sm"
								onClick={onRetry}
								className="flex-1"
							>
								<Icons.Zap className="mr-2 h-4 w-4" />
								Retry Analysis
							</Button>
						)}
					</div>
				</CardContent>
			)}
		</Card>
	)
}

export { PostStatusCard }
